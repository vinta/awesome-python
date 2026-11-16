For file manipulation, Python's built-in pathlib handles paths, and zipfile and tarfile handle archives. Install watchfiles to rerun your code when files change.

How to choose:

- Building, joining, and reading paths: pathlib
- ZIP archives: zipfile, or pyzipper to write AES-encrypted ones
- Tar archives, compressed or not: tarfile
- Rerunning code or restarting a process when files change: watchfiles
- Reacting to files being moved, opened, or closed: watchdog
- File type: mimetypes from the filename, python-magic or Magika from the content
- Listing, copying, and opening files on S3, GCS, and other storage: fsspec
- An open() replacement that streams remote files: smart-open
- Compressing data: compression.zstd, or gzip when another tool expects gzip
- zstd features the standard library lacks: zstandard
- Decompression speed over size: lz4; denser output than gzip: brotli
- 7z archives: py7zr; reading RAR archives: rarfile

### pathlib

Use pathlib, in the standard library, for any path you build, join, or read. Its docs say [`Path` is most likely what you need](https://docs.python.org/3/library/pathlib.html): it makes a path for the platform your code runs on. Join parts with the `/` operator.

### zipfile

Use zipfile, in the standard library, to [create, read, write, append, and list](https://docs.python.org/3/library/zipfile.html) ZIP archives. Open an archive with the `ZipFile` class to read, write, or extract it.

### pyzipper

Pick pyzipper to write password-protected ZIP files, since zipfile [can decrypt them but cannot create an encrypted file](https://docs.python.org/3/library/zipfile.html). It's a fork of zipfile that [reads and writes AES-encrypted ZIP files](https://github.com/danifus/pyzipper) and keeps zipfile's API from when it forked. Open archives with its `AESZipFile` class.

### tarfile

Use tarfile, in the standard library, for tar archives, compressed or not. When reading, [`tarfile.open()`](https://docs.python.org/3/library/tarfile.html#tarfile.open) detects the compression for you, which its docs recommend.

### watchfiles

Pick watchfiles to rerun code or restart a process when files change. It [groups changes into batches in Rust](https://watchfiles.helpmanual.io/) instead of firing once per file, and each batch lists files as added, modified, or deleted. Loop over `watch(path)` to handle each batch yourself, or give [`run_process()`](https://watchfiles.helpmanual.io/api/run_process/) a function or a command to restart on every change.

### watchdog

Pick watchdog when your code reacts to files being moved, opened, or closed: its event handler has [a method per event type](https://python-watchdog.readthedocs.io/en/latest/api/events.html), like `on_moved()` and `on_closed()`. Subclass `FileSystemEventHandler`, [schedule it on an `Observer`](https://python-watchdog.readthedocs.io/en/latest/quickstart.html) for a path, and start the observer thread.

### mimetypes

Use mimetypes, in the standard library, when a file's name is all you need. It [maps a filename extension to a MIME type](https://docs.python.org/3/library/mimetypes.html). For files whose names you can't trust, like uploads, detect the type from the content instead.

### python-magic

Pick python-magic to identify a file by its content. It wraps libmagic, which [identifies file types by checking their headers](https://github.com/ahupp/python-magic) and powers the Unix `file` command. You install that C library separately. `magic.from_file()` returns a file's type.

### Magika

Pick Magika to detect file types with a deep-learning model, as Google does to [route Gmail, Drive, and Safe Browsing files](https://github.com/google/magika) to the right security scanners. Create a `Magika()` and call `identify_path()` or `identify_bytes()` on it.

### fsspec

Pick fsspec to list, copy, and open files across local disk, S3, GCS, and other storage through one API. Its filesystem classes share [uniform methods like `cp`, `rm`, and `mkdir`](https://filesystem-spec.readthedocs.io/en/latest/), and pandas, Dask, and xarray already use it for their file handling. Get a filesystem with [`fsspec.filesystem("s3")`](https://filesystem-spec.readthedocs.io/en/latest/usage.html) to call `ls()` or `glob()` on it, or open one file from a URL with `fsspec.open()`.

### smart_open

Pick smart_open to stream a large file to or from S3, GCS, Azure, HDFS, or HTTP with code written for `open()`. It's [a drop-in replacement for the built-in `open()`](https://github.com/piskvorky/smart_open) that also compresses or decompresses on the fly when the name ends in an extension like `.gz` or `.zst`. Run `from smart_open import open` and pass an `s3://` URL where a path would go.

### compression.zstd

Use compression.zstd, in the standard library, as your default for compressing data and files. Zstandard is [a fast lossless compression algorithm](https://docs.python.org/3/library/compression.zstd.html) built for real-time compression. Read and write `.zst` files with `zstd.open()`.

### gzip

Use gzip, in the standard library, when the other side expects gzip, like a tool or client you don't control. It [compresses files like the GNU `gzip` and `gunzip` programs](https://docs.python.org/3/library/gzip.html), and `gzip.open()` reads and writes them like regular files.

### python-zstandard

Pick python-zstandard only when compression.zstd lacks something you need. Its own docs say the standard library has fewer features, but is [probably the easiest way](https://python-zstandard.readthedocs.io/en/latest/projectinfo.html) to use Zstandard in Python. Start from its [`ZstdCompressor` class](https://python-zstandard.readthedocs.io/en/latest/compressor.html).

### python-lz4

Pick python-lz4 when decompression speed matters more than size: LZ4 has [an extremely fast decoder](https://github.com/lz4/lz4). Use [the frame format](https://python-lz4.readthedocs.io/en/stable/intro.html), which its docs recommend for most applications because other LZ4 bindings can read it.

### Brotli

Pick Brotli for output denser than gzip's: its README says it [offers more dense compression than deflate](https://github.com/google/brotli), the algorithm gzip runs.

### py7zr

Pick py7zr to read or write 7z archives. For archives you create, rarfile's FAQ suggests [Zip for better compatibility and 7z for better compression](https://rarfile.readthedocs.io/faq.html#will-it-support-creating-rar-archives), so reach for py7zr when size matters more than who can open the file. Open archives with its `SevenZipFile` class.

### rarfile

Pick rarfile to read RAR archives through [a zipfile-style interface](https://rarfile.readthedocs.io/). It extracts compressed files by running an external tool, unrar preferred, so install that too.

### Archives from strangers

Treat an archive someone else made as hostile: tarfile's and zipfile's docs both say never to extract an untrusted one without inspecting it first. Follow tarfile's [hints for further verification](https://docs.python.org/3/library/tarfile.html#hints-for-further-verification): extract to a new temporary directory, and cap the number of files, their total size, and the size of each one.
