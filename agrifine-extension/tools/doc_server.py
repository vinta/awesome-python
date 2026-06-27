"""
Agrifine Document Processing Server
Runs locally at http://localhost:7432 and gives the extension robust
document parsing for CSV, Excel, and PDF files via Python libraries.

Install deps:  pip install flask flask-cors pandas openpyxl pypdf2
Run:           python tools/doc_server.py
"""

import io
import json
import sys
import traceback

try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
    import pandas as pd
    import PyPDF2
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Run: pip install flask flask-cors pandas openpyxl pypdf2")
    sys.exit(1)

app = Flask(__name__)
CORS(app, origins=["chrome-extension://*"])

PORT = 7432


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "agrifine-doc-server"})


@app.route("/parse", methods=["POST"])
def parse_document():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    f = request.files["file"]
    filename = f.filename.lower()
    data = f.read()

    try:
        if filename.endswith(".csv"):
            text, preview = _parse_csv(data)
        elif filename.endswith((".xlsx", ".xls")):
            text, preview = _parse_excel(data, filename)
        elif filename.endswith(".pdf"):
            text, preview = _parse_pdf(data)
        else:
            return jsonify({"error": f"Unsupported file type: {filename}"}), 400

        return jsonify({"text": text, "preview": preview, "filename": f.filename})

    except Exception:
        return jsonify({"error": traceback.format_exc()}), 500


def _parse_csv(data: bytes):
    df = pd.read_csv(io.BytesIO(data), nrows=500)
    text = df.to_csv(index=False)
    preview = _df_preview(df)
    return text, preview


def _parse_excel(data: bytes, filename: str):
    engine = "openpyxl" if filename.endswith(".xlsx") else "xlrd"
    xl = pd.ExcelFile(io.BytesIO(data), engine=engine)
    parts = []
    previews = {}
    for sheet in xl.sheet_names[:4]:
        df = xl.parse(sheet, nrows=200)
        parts.append(f"Sheet: {sheet}\n{df.to_csv(index=False)}")
        previews[sheet] = _df_preview(df)
    return "\n\n".join(parts), json.dumps(previews)


def _parse_pdf(data: bytes):
    reader = PyPDF2.PdfReader(io.BytesIO(data))
    pages = min(len(reader.pages), 15)
    texts = []
    for i in range(pages):
        texts.append(reader.pages[i].extract_text() or "")
    text = "\n".join(texts)
    preview = text[:600].replace("\n", " ").strip()
    return text, preview


def _df_preview(df: "pd.DataFrame") -> str:
    rows, cols = df.shape
    col_names = ", ".join(str(c) for c in df.columns[:10])
    sample = df.head(3).to_dict(orient="records")
    return f"{rows} rows × {cols} cols | columns: {col_names} | sample: {json.dumps(sample[:2], default=str)[:300]}"


if __name__ == "__main__":
    print(f"Agrifine doc server running at http://localhost:{PORT}")
    print("The extension will auto-detect this server and use it for document parsing.")
    app.run(host="127.0.0.1", port=PORT, debug=False)
