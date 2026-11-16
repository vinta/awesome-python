Do your users rate items, or only click, play, and buy them? Train on ratings with Surprise and on actions with Implicit, then let Annoy find similar items.

How to choose:

- Star ratings or other explicit scores: scikit-surprise
- Learning recommender algorithms, or comparing them on a small dataset: scikit-surprise
- Clicks, plays, purchases, or other implicit feedback: implicit
- Fast lookups of similar items from trained vectors: annoy

### Surprise

Pick Surprise when your users rate items, like one to five stars for a movie. It's [a Python scikit for recommender systems that deal with explicit rating data](https://surpriselib.com/), with classic algorithms like SVD and k-NN built in. Tutorials and best-practice guides also point to it for learning how recommenders work and for trying algorithms on smaller datasets. That fits its first design goal: [perfect control over your experiments](https://github.com/NicolasHug/Surprise). Start with [`cross_validate()`](https://surprise.readthedocs.io/en/stable/getting_started.html), which scores an algorithm on the built-in MovieLens data in a few lines of code.

### Implicit

Pick Implicit when your data is what users did, not what they rated: clicks, plays, and purchases. It gives you [fast recommendation algorithms for implicit feedback datasets](https://benfred.github.io/implicit/), and every model trains in parallel on all your CPU cores. Its input is a sparse user-by-item matrix, where each value is [how confident you are that the user likes the item](https://benfred.github.io/implicit/api/models/recommender_base.html). Start with the `AlternatingLeastSquares` model, as [the docs' basic usage](https://benfred.github.io/implicit/#basic-usage) does.

### Annoy

Add Annoy once a model has turned your users and items into vectors and you need to find the nearest ones fast. It isn't a recommender on its own: its README places it [after matrix factorization](https://github.com/spotify/annoy#background), to search those vectors for similar users and items. Implicit can also [use it to speed up recommendations](https://benfred.github.io/implicit/api/ann.html). Its indexes are [read-only files that many processes can share](https://github.com/spotify/annoy), so you build one once and every process maps it into memory. Build an index with `AnnoyIndex`, the class [its Python example](https://github.com/spotify/annoy#python-code-example) starts from.
