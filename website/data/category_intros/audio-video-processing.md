Python audio processing often pairs two libraries: soundfile reads and writes audio files, and librosa analyzes them, loading each file through soundfile.

How to choose:

- Reading and writing audio files as NumPy arrays: soundfile
- Spectrograms, pitch, onsets, tempo, and beats: librosa
- Existing code that cuts, fades, and joins clips with AudioSegment: Pydub
- Decoding video frames into NumPy, or remuxing without re-encoding: PyAV
- Cutting scenes, adding titles, and compositing clips from a script: MoviePy
- Writing tags in MP3, FLAC, MP4, Ogg, and other formats: Mutagen
- Reading tags and duration, without writing them: tinytag
- Sorting a music collection and fixing its tags from MusicBrainz: beets

### soundfile

Pick soundfile to read and write audio files as NumPy arrays. librosa's own docs point to it too: [for writing files, or for reading with more flexibility than `librosa.load()` gives](https://librosa.org/doc/latest/ioformats.html), they send you to soundfile. Unlike librosa's loader, soundfile doesn't resample, so you get the file at its own sample rate. [`sf.read()`](https://python-soundfile.readthedocs.io/en/latest/#read-write-functions) returns the samples and their sample rate, and `sf.write()` saves them in any format libsndfile supports, like WAV or FLAC.

### librosa

Pick librosa to analyze music and other audio. It provides [the foundational algorithms for music information retrieval](https://librosa.org/doc/latest/index.html), and its [tutorials](https://librosa.org/doc/latest/auto_tutorials/index.html) cover spectrograms, pitch, onsets, harmony, and rhythm. Load your files with `librosa.load()`, which returns the signal as a NumPy array plus its sample rate. For analysis, [keep its default sample rate and mono mix](https://librosa.org/doc/latest/auto_tutorials/01-intro/01-load.html), which are designed to work with librosa's other defaults.

### Pydub

Keep Pydub for code that already edits clips with its `AudioSegment`. Its [quickstart](https://github.com/jiaaro/pydub#quickstart) slices audio by milliseconds, joins clips with `+` or a crossfade, and fades them in and out. It opens and saves WAV in pure Python, and [needs FFmpeg for MP3 and other formats](https://github.com/jiaaro/pydub#dependencies).

### PyAV

Pick PyAV when your code needs [direct and precise access](https://pyav.basswood.io/docs/stable/) to a media file's containers, streams, packets, codecs, and frames. It's a Pythonic binding for FFmpeg. Open a file with `av.open()`, decode its frames, and [convert each one with `frame.to_ndarray()`](https://pyav.basswood.io/docs/stable/cookbook/numpy.html) to process it in NumPy. To move streams into another container without re-encoding them, [remux their packets](https://pyav.basswood.io/docs/stable/cookbook/basics.html#remuxing), which keeps the source's full quality.

### MoviePy

Pick MoviePy to [automate video editing](https://zulko.github.io/moviepy/getting_started/quick_presentation.html#do-i-need-moviepy) from a script: cutting scenes, adding titles and end credits, compositing clips, or rendering videos and GIFs on a web server. Its docs also say it isn't the best fit for frame-by-frame analysis; for that, PyAV hands you each decoded frame. A [typical MoviePy script](https://zulko.github.io/moviepy/getting_started/quick_presentation.html#example-code) loads files as clips, modifies them, composites them, and renders the result.

### Mutagen

Pick Mutagen to write tags, through [an API that is roughly the same across tag formats](https://mutagen.readthedocs.io/en/latest/#why-mutagen), from MP3's ID3 to FLAC, MP4, and Ogg. [Open a file](https://mutagen.readthedocs.io/en/latest/user/gettingstarted.html) with `mutagen.File()`, which guesses its format, or with a format class like `FLAC`, set a key like `audio["title"]`, and call `audio.save()`.

### tinytag

Pick tinytag when you only read metadata. It [only provides the minimum needed for reading](https://github.com/tinytag/tinytag#usage) and is MIT-licensed, while [Mutagen is GPL](https://mutagen.readthedocs.io/en/latest/). `TinyTag.get()` returns an object with fields like `tag.artist` and `tag.duration`. To write tags, its README points you to Mutagen.

### beets

Pick beets to organize a music collection, not to tag files from your own code. It's [a media library management system](https://beets.readthedocs.io/en/latest/) you run as the `beet` command. Its getting-started guide [recommends an autotagger plugin](https://beets.readthedocs.io/en/latest/guides/main.html#basic-configuration), with MusicBrainz as a good first choice. Then [import a few albums at a time](https://beets.readthedocs.io/en/latest/guides/main.html#choose-your-import-method): the autotagger looks up each album and corrects its tags.
