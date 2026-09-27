Each job has its own pick: librosa is the Python audio processing library for music analysis, MoviePy edits video from a script, and Mutagen tags audio files.

How to choose:

- Cutting, joining, and fading audio files: pydub
- Music and audio analysis: librosa
- Editing video or making GIFs from a script: MoviePy
- Real-time video from cameras and network streams: VidGear
- Reading and writing tags across formats: Mutagen
- Reading tags only: tinytag
- Tagging and organizing your music collection: beets

pydub gives you a simple, high-level interface to cut, join, and fade audio. It opens and saves WAV files in pure Python, but [other formats like MP3 need FFmpeg](https://github.com/jiaaro/pydub#dependencies), so install FFmpeg with it. An AudioSegment is [immutable](https://github.com/jiaaro/pydub#quickstart): every operation returns a new one, so you can chain them, and every length and position is in milliseconds.

librosa gives you [the foundational algorithms and tools for music information retrieval](https://librosa.org/doc/latest/index.html). By default, `librosa.load` resamples the signal and mixes stereo down to mono, and those defaults [suit most analysis tasks](https://librosa.org/doc/latest/auto_tutorials/01-intro/01-load.html); pass `sr=None` to keep the file's own sampling rate. When you need more control than `load` gives you, such as writing files, [its docs recommend using its audio I/O backend directly](https://librosa.org/doc/latest/ioformats.html).

MoviePy is for [automating video editing](https://zulko.github.io/moviepy/getting_started/quick_presentation.html): processing many videos, composing them in complicated ways, or making videos and GIFs on a web server. A script loads clips, modifies them, puts them together, and writes the result. Modifying a clip [returns a new clip and leaves the original alone](https://zulko.github.io/moviepy/user_guide/modifying.html), and the computation happens at the final render. Open file clips in a `with` block, or [call `close()`](https://zulko.github.io/moviepy/user_guide/loading.html) when you're done, since each one holds a subprocess and a lock on the file. MoviePy can't stream video. For frame-by-frame analysis, its docs send you to a computer vision library.

VidGear is a framework for [real-time media applications](https://abhitronix.github.io/vidgear/latest/) built on OpenCV and FFmpeg. All its APIs [keep OpenCV's coding syntax](https://abhitronix.github.io/vidgear/latest/switch_from_cv/). Each task has [its own gear](https://abhitronix.github.io/vidgear/latest/gears/): CamGear reads cameras, network streams, and streaming sites in multiple threads. WriteGear writes frames to a video file or network stream, and StreamGear transcodes video into adaptive streaming formats. [Install OpenCV first](https://abhitronix.github.io/vidgear/latest/installation/pip_install/), since the core functions need it.

Mutagen reads and writes tags with [roughly the same API across all tag formats](https://mutagen.readthedocs.io/en/latest/). `mutagen.File` [guesses the file type](https://mutagen.readthedocs.io/en/latest/user/gettingstarted.html). ID3 tags in MP3 files are highly structured; for common keys, use [the simpler EasyID3 interface](https://mutagen.readthedocs.io/en/latest/user/id3.html). Mutagen is GPL-licensed; if you only read tags, MIT-licensed tinytag avoids that.

tinytag only reads metadata, and [writing support will not be added](https://github.com/tinytag/tinytag): its README points you to Mutagen for that. It's pure Python with no dependencies and gives you the same API for every format. `TinyTag.get()` returns an object with attributes like `artist` and `duration`.

beets is a command-line music library manager, not a library you import: it [catalogs your collection and improves its metadata](https://beets.io/) as it goes. Install it [as a standalone tool](https://beets.readthedocs.io/en/stable/guides/installation.html), isolated from your system Python and other packages. `beet import` can modify and move your files, so [back up first and import a few albums at a time](https://beets.readthedocs.io/en/stable/guides/main.html). [Plugins](https://beets.readthedocs.io/en/stable/plugins/index.html) add commands, fetch extra data during import, and add metadata sources.

FFmpeg sits under most of these projects: pydub needs it for any format other than WAV, MoviePy runs on it, and VidGear's WriteGear and StreamGear wrap it. When you only want to convert a video file or turn images into a movie, [call FFmpeg directly](https://zulko.github.io/moviepy/getting_started/quick_presentation.html). MoviePy's own docs say it's faster and uses less memory than going through MoviePy.
