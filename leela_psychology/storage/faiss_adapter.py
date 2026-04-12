"""FAISS vector index adapter.

Provides a thin wrapper around a ``faiss.IndexFlatL2`` index with:
- Persistent storage (index file + JSON id-map)
- Deletion via index rebuild (FAISS Flat does not support in-place removal)
- kNN search returning (metadata_id, L2_distance) pairs

Install dependency: ``pip install faiss-cpu``
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import List, Tuple


class FAISSAdapter:
    """Local FAISS index for kNN similarity search."""

    def __init__(self, index_path: str, dimension: int = 384) -> None:
        self.index_path = Path(index_path)
        self.index_path.mkdir(parents=True, exist_ok=True)
        self.dimension = dimension
        self._index_file = self.index_path / "index.faiss"
        self._map_file = self.index_path / "id_map.json"

        self._load()

    # ── Private ───────────────────────────────────────────────────────────────

    def _load(self) -> None:
        try:
            import faiss  # type: ignore
            import numpy as np  # noqa: F401 (ensure numpy available)

            if self._index_file.exists():
                self.index = faiss.read_index(str(self._index_file))
                self.id_map: List[str] = json.loads(self._map_file.read_text())
            else:
                self.index = faiss.IndexFlatL2(self.dimension)
                self.id_map = []
            self._available = True
        except ImportError:
            self._available = False
            self.id_map = []

    def _save(self) -> None:
        if not self._available:
            return
        import faiss  # type: ignore

        faiss.write_index(self.index, str(self._index_file))
        self._map_file.write_text(json.dumps(self.id_map))

    # ── Public API ────────────────────────────────────────────────────────────

    def add_vector(self, embedding: List[float], metadata_id: str) -> None:
        if not self._available:
            return
        import numpy as np

        v = np.array([embedding], dtype="float32")
        self.index.add(v)
        self.id_map.append(metadata_id)
        self._save()

    def search(
        self, query_vector: List[float], top_k: int = 5
    ) -> List[Tuple[str, float]]:
        """Return up to *top_k* ``(metadata_id, distance)`` tuples."""
        if not self._available or len(self.id_map) == 0:
            return []
        import numpy as np

        v = np.array([query_vector], dtype="float32")
        distances, indices = self.index.search(v, min(top_k, len(self.id_map)))
        results = []
        for idx, dist in zip(indices[0], distances[0]):
            if idx != -1 and idx < len(self.id_map):
                results.append((self.id_map[idx], float(dist)))
        return results

    def remove_by_ids(self, ids_to_remove: List[str]) -> None:
        """Rebuild the index excluding *ids_to_remove* (O(n) rebuild)."""
        if not self._available or not ids_to_remove:
            return
        import faiss  # type: ignore
        import numpy as np

        remove_set = set(ids_to_remove)
        new_map: List[str] = []
        new_index = faiss.IndexFlatL2(self.dimension)

        for i, meta_id in enumerate(self.id_map):
            if meta_id not in remove_set:
                vec = self.index.reconstruct(i)
                new_index.add(np.array([vec]))
                new_map.append(meta_id)

        self.index = new_index
        self.id_map = new_map
        self._save()
