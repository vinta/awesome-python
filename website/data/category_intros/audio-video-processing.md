For a Python audio processing library, use librosa to analyze audio and music. For video, use MoviePy to edit clips in code, or VidGear for live streams.

How to choose:

- Audio and music analysis, such as beat tracking or spectrograms: librosa
- Quick cuts, fades, and format conversion: pydub
- Editing video in code, such as cuts, titles, and compositing: MoviePy
- Webcams, live streams, and screen capture in real time: VidGear
- Reading tags, with one API for every format and an MIT license: tinytag
- Writing tags: Mutagen, which is GPL-licensed
- Organizing a whole music collection and fixing its tags from MusicBrainz: beets

With librosa, `librosa.load()` resamples everything to 22050 Hz by default. Pass `sr=None` to [keep the file's native sampling rate](https://librosa.org/doc/latest/api/generated/librosa.load.html), or `offset` and `duration` to load only part of a file.

With pydub, load a file with `AudioSegment.from_file()`, slice it in milliseconds, and save it with `export()`. WAV works in pure Python, but every other format [needs FFmpeg](https://github.com/jiaaro/pydub#dependencies). The standard library dropped the `audioop` module pydub imports, so [install `audioop-lts`](https://github.com/jiaaro/pydub/issues/863) next to it.

A MoviePy script loads clips, changes them with `subclipped()` and the `with_*` methods, and calls `write_videofile()`. Open file clips in a `with` block, since each file clip [locks the file](https://zulko.github.io/moviepy/user_guide/loading.html) until it's closed. To only convert a video file, MoviePy's docs tell you to call FFmpeg directly: it's ["faster and more memory-efficient"](https://zulko.github.io/moviepy/getting_started/quick_presentation.html).

MoviePy can't stream video, such as reading from a webcam, so use VidGear for that. It [needs OpenCV](https://abhitronix.github.io/vidgear/latest/installation/pip_install/) installed first. Its gears keep OpenCV's read loop: `CamGear(source=0).start()`, call `read()` until it returns `None`, then `stop()`.

tinytag only reads tags: ["Support for changing/writing metadata will not be added."](https://github.com/tinytag/tinytag) To write them, use Mutagen. `mutagen.File()` guesses the format for you, and Mutagen [saves ID3 tags as v2.4](https://mutagen.readthedocs.io/en/latest/user/id3.html) unless you open and save them with `v2_version=3`.

beets runs from the command line: set `directory` and `library` in its config file, then run `beet import`. Its getting started guide recommends the autotagger and [importing a few albums at a time](https://beets.readthedocs.io/en/stable/guides/main.html). It also warns that importing can modify and move your files, so back them up first.

For long files, `librosa.stream()` reads audio [block by block](https://librosa.org/doc/latest/api/generated/librosa.stream.html) instead of loading it all into memory; set `center=False` in the analyses you run on those blocks. pydub [loads the whole file into RAM](https://github.com/jiaaro/pydub/issues/51#issuecomment-35839094), so pass `start_second` and `duration` to `from_file()` when you only need a slice.
