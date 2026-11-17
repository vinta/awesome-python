Without installing anything, two Python file manipulation libraries cover paths and file types by name: pathlib and mimetypes. python-magic reads the bytes.

How to choose:

- Building and joining paths, and listing directories: pathlib
- A MIME type from a file name or URL: mimetypes
- A file's type from its content, like the Unix `file` command: python-magic
- Rerunning or reloading code when files change: watchfiles
- Your own handler for each created, modified, or moved file: watchdog
- Telling text file types apart, like source code from config files: Magika
- Listing, globbing, and copying files on cloud or remote storage: fsspec
- Streaming one large remote file through a drop-in `open()`: smart_open
- Zstandard files and data: compression.zstd, or zstandard for multi-threaded compression
- Reading and writing .gz files: gzip
- Denser compression than gzip at a similar speed: brotli
- Compressing and decompressing as fast as possible: lz4
- Tar and ZIP archives: tarfile and zipfile, or pyzipper for AES-encrypted ZIP files
- 7-Zip and RAR archives: py7zr, or rarfile to read .rar files

If you aren't sure which pathlib class you need, the docs say [`Path` is most likely it](https://docs.python.org/3/library/pathlib.html): it makes a concrete path for the platform your code runs on. [Join paths with the `/` operator](https://docs.python.org/3/library/pathlib.html#basic-use), and list a directory with `iterdir()` or `glob()`.

mimetypes [maps a file name's extension to a MIME type](https://docs.python.org/3/library/mimetypes.html), and a MIME type back to extensions. A type guess returns 2 values: a type for the Content-Type header, and an encoding like gzip for the Content-Encoding header. The type is [`None` for a missing or unknown suffix](https://docs.python.org/3/library/mimetypes.html#mimetypes.guess_type).

python-magic wraps libmagic, which [identifies file types by checking their headers](https://github.com/ahupp/python-magic), the way the Unix `file` command does. It's a thin wrapper, so install libmagic too, with `apt-get install libmagic1` or `brew install libmagic`. Call `magic.from_file(path, mime=True)` for a MIME type, or `magic.from_buffer()` on bytes you already have.

watchfiles is built for [file watching and code reload](https://watchfiles.helpmanual.io/), and its Rust core groups changes into batches instead of firing once per file. `watch()` is a generator that [yields sets of changes](https://watchfiles.helpmanual.io/api/watch/#watchfiles.watch), and `awatch()` is the async version. To restart code when files change, use [`run_process()`](https://watchfiles.helpmanual.io/api/run_process/#watchfiles.run_process) with a function or a command. From a shell, the [`watchfiles` CLI](https://watchfiles.helpmanual.io/cli/) does the same: `watchfiles --filter python 'pytest --lf' src tests`.

watchdog gives you [an API and a shell tool](https://python-watchdog.readthedocs.io/en/latest/) for monitoring directories. Its [quickstart](https://python-watchdog.readthedocs.io/en/latest/quickstart.html) has you subclass `FileSystemEventHandler`, override methods like `on_created()` and `on_modified()`, schedule the handler on an `Observer`, and start that thread. An observer skips subdirectories unless you pass `recursive=True` to `schedule()`.

Magika runs [a compact deep-learning model](https://securityresearch.google/magika/core-concepts/how-magika-works/) on a few chunks of a file, without loading large files entirely into memory. On its own test set, it [outperforms existing approaches, especially on textual content types](https://github.com/google/magika#highlights). Create a `Magika()` instance, then [call `identify_path()` on a file or `identify_bytes()` on bytes you already have](https://securityresearch.google/magika/cli-and-bindings/python/#instantiating-magika). Check `result.ok` before you read `result.output.label` or `result.output.mime_type`.

fsspec gives you [one API for local, remote, and embedded file systems](https://filesystem-spec.readthedocs.io/en/latest/), and it works the same whatever the storage backend. Get a file system by protocol name, like `fsspec.filesystem("s3")`, then call methods that [follow posix naming and the `os` module](https://filesystem-spec.readthedocs.io/en/latest/usage.html#use-a-file-system): `ls()`, `glob()`, `cp()`, and `rm()`. For one file, [`fsspec.open()` picks the backend from the URL](https://filesystem-spec.readthedocs.io/en/latest/usage.html#higher-level), and opens the file only when you enter its `with` block.

smart_open is [a drop-in replacement for Python's built-in `open()`](https://github.com/piskvorky/smart_open#what) that streams very large files from and to S3, GCS, Azure Blob Storage, HDFS, HTTP, and SFTP. Import its `open` in place of the built-in, and pass it a URL like `s3://bucket/key`. A file name ending in `.gz`, `.bz2`, or `.zst` gets [compressed or decompressed on the fly](https://github.com/piskvorky/smart_open#compression-handling). To use your own credentials or settings, [pass the storage service's client object in `transport_params`](https://github.com/piskvorky/smart_open#transport-specific-options).

compression.zstd covers files, bytes, and streams. [`compression.zstd.open()`](https://docs.python.org/3/library/compression.zstd.html#compression.zstd.open) reads and writes .zst files as file objects, `compress()` and `decompress()` handle bytes in one call, and `ZstdCompressor` and `ZstdDecompressor` work through data a chunk at a time.

gzip [opens .gz files like regular files](https://docs.python.org/3/library/gzip.html#gzip.open): `gzip.open()` takes `'rb'` or `'wb'` for bytes, and `'rt'` or `'wt'` for text. For data already in memory, call `gzip.compress()` and `gzip.decompress()`.

zstandard is [the most feature-rich zstd binding](https://python-zstandard.readthedocs.io/en/latest/projectinfo.html#comparison-to-other-python-bindings). Still, its own docs say the standard library is probably the easiest way to use zstd, if it works for you. Use its one-shot APIs for data that fits in memory, and [its streaming APIs for large inputs](https://python-zstandard.readthedocs.io/en/latest/api_usage.html#choosing-an-api). Pass `threads` to `ZstdCompressor` to [compress on several cores](https://python-zstandard.readthedocs.io/en/latest/multithreaded.html), in C threads that run outside the GIL.

brotli is the Python module of the Brotli project, whose format is [similar in speed to deflate but denser](https://github.com/google/brotli#introduction). Call `brotli.compress()` and `brotli.decompress()` on bytes, or [feed a `brotli.Compressor` piece by piece](https://github.com/google/brotli/blob/master/python/brotli.py) with `process()`, then call `finish()`.

lz4 binds the LZ4 library, built for [extremely fast compression and an extremely fast decoder](https://github.com/lz4/lz4). Its docs recommend [the `lz4.frame` bindings](https://python-lz4.readthedocs.io/en/stable/quickstart.html#simple-usage), since the frame format works with other LZ4 implementations and language bindings. `lz4.frame.open()` is [the most convenient way to work with compressed files](https://python-lz4.readthedocs.io/en/stable/quickstart.html#working-with-compressed-files), and it works like `gzip.open()`.

tarfile reads and writes tar archives through [`tarfile.open()`](https://docs.python.org/3/library/tarfile.html#tarfile.open), and a mode like `'r:gz'` or `'w:zst'` picks the compression. To extract, use `extractall()` with the [`'data'` filter](https://docs.python.org/3/library/tarfile.html#extraction-filters), which is meant for cross-platform data archives. Still, never extract an archive from an untrusted source without inspecting it first.

zipfile works through [`ZipFile` as a context manager](https://docs.python.org/3/library/zipfile.html#zipfile-objects): `ZipFile('spam.zip', 'w')` to write, then `write()` each file. Before you call `extractall()` on an archive you didn't make, [inspect it first](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.extractall), since members with absolute paths or `..` can land outside the target folder.

py7zr opens 7-Zip archives with [`SevenZipFile` in a `with` block](https://github.com/miurahr/py7zr#sevenzipfile-class-usage): call `extractall()` in `'r'` mode, or `writeall()` in `'w'` mode to pack a whole folder.

pyzipper is [a replacement for `zipfile` that reads and writes AES-encrypted ZIP files](https://github.com/danifus/pyzipper#usage), with the same API. Open the archive with `pyzipper.AESZipFile`, pass `encryption=pyzipper.WZ_AES` when writing, and call `setpassword()` with a bytes password.

rarfile reads RAR archives through [an interface in the style of `zipfile`](https://github.com/markokr/rarfile). It parses archives in pure Python, but extracts compressed files with an external tool, so install unrar, the one it recommends.
