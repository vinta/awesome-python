To track tempo and beats with a Python audio processing library, load music into librosa. MoviePy cuts and joins video in code. Mutagen reads and writes tags.

How to choose:

- Tempo, beats, and other music analysis: librosa
- Scripted video edits, titles, and compositing: MoviePy
- Reading and writing tags: Mutagen
- Reading and writing sound files as NumPy arrays: soundfile
- Slicing, fading, and joining audio clips: pydub
- Frame- and packet-level access to FFmpeg: PyAV
- Reading tags only, without GPL code: tinytag
- Organizing a music collection with MusicBrainz data: beets

librosa is a Python library for [audio and music signal processing](https://librosa.org/doc/latest/index.html), with the building blocks for music information retrieval: spectrograms, chroma, onsets, tempo, and beats. Load each file with [`librosa.load()`](https://librosa.org/doc/latest/auto_tutorials/01-intro/01-load.html), which resamples it to a standard rate and mixes it down to mono, the defaults the rest of librosa is designed around.

soundfile reads and writes [any format libsndfile supports](https://python-soundfile.readthedocs.io/en/latest/#read-write-functions), like WAV, FLAC, and OGG: `sf.read()` returns the samples as a NumPy array along with the sample rate, and `sf.write()` saves them. librosa reads files through soundfile, and its docs [recommend using soundfile directly](https://librosa.org/doc/latest/ioformats.html) to write audio, or when you need more control than loading a whole recording into memory.

pydub [does things in milliseconds](https://github.com/jiaaro/pydub): slice an `AudioSegment` like a list, add 6 to boost it by 6 dB, then join, crossfade, or fade clips. Load files with [`AudioSegment.from_file()`](https://github.com/jiaaro/pydub/blob/master/API.markdown), which the docs recommend over the format-specific wrappers. Every operation returns an `AudioSegment`, so you can chain them before `export()` writes the result.

MoviePy is for [automating video edits](https://zulko.github.io/moviepy/getting_started/quick_presentation.html#do-i-need-moviepy): cutting scenes, adding titles and subtitles, or composing many videos into one. A [typical script](https://zulko.github.io/moviepy/getting_started/quick_presentation.html#example-code) loads videos as clips, modifies them, puts them together in a `CompositeVideoClip`, and writes the result with `write_videofile()`.

PyAV binds FFmpeg's libraries for [direct and precise access](https://pyav.basswood.io/docs/stable/) to your media's containers, streams, packets, codecs, and frames. Open a file with `av.open()` and loop over `container.decode(video=0)` to get frames, which [convert to NumPy arrays](https://pyav.basswood.io/docs/stable/cookbook/numpy.html) with `to_ndarray()` and back with `av.VideoFrame.from_ndarray()`.

Mutagen reads and writes tags in many audio formats through [one API](https://mutagen.readthedocs.io/en/latest/#why-mutagen) that's roughly the same across them. `mutagen.File()` [guesses the file's type](https://mutagen.readthedocs.io/en/latest/user/gettingstarted.html), you set tags like dict keys, and `save()` writes them. Mutagen is GPL.

tinytag, which is MIT and pure Python, only reads: `TinyTag.get(path)` returns the [title, artist, album, duration, and more](https://github.com/tinytag/tinytag) as attributes.

beets runs from the command line: it [catalogs your music collection](https://beets.io/) and improves its metadata from MusicBrainz as it goes. Point [`beet import`](https://beets.readthedocs.io/en/stable/guides/tagger.html) at a folder of albums, and it tags the files as it adds them to your library. The docs [recommend this autotagged import](https://beets.readthedocs.io/en/stable/guides/main.html#importing-your-music): it asks you questions along the way, but gets every song's tags right from the start.

MoviePy and PyAV both run on FFmpeg. When the `ffmpeg` command [does the job](https://pyav.basswood.io/docs/stable/) on its own, call it directly: MoviePy's docs say that's [faster and more memory-efficient](https://zulko.github.io/moviepy/getting_started/quick_presentation.html#do-i-need-moviepy).
