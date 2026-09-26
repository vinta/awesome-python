Whether you're building an app or learning the field, there's a Python NLP library for it: spaCy for apps, NLTK for learning. Stanza covers many languages.

How to choose:

- Production NLP pipelines: spaCy
- Learning NLP, or lexical resources like WordNet: NLTK
- Many languages, or CoreNLP from Python: Stanza
- Chinese word segmentation: jieba
- Chinese characters to pinyin: pypinyin
- Spaces between CJK text and letters or digits: pangu.py

spaCy is [designed for production use](https://spacy.io/usage/facts-figures#comparison-usage): you build and train NLP pipelines, then package them to deploy. Its trained pipelines are Python packages. In an automated build, [install them with pip from a direct link](https://spacy.io/usage/models#download-pip) instead of spaCy's download command, and put that link in your requirements.txt. In a larger code base, [import the pipeline as a module](https://spacy.io/usage/models#models-loading), so a missing one raises an ImportError right away. Run your texts through `nlp.pipe` [in batches](https://spacy.io/usage/processing-pipelines#processing), and disable the components you don't need. To train your own pipeline, run [`spacy train` with one config file](https://spacy.io/usage/training#quickstart).

NLTK comes with [corpora and lexical resources such as WordNet](https://www.nltk.org/), plus libraries to tokenize, tag, parse, and classify text. Its creators wrote a book that teaches NLP with it, and you can read it online. The book also says NLTK [isn't highly optimized for runtime performance](https://www.nltk.org/book/ch00.html#natural-language-toolkit-nltk), so use it to learn and experiment. The data ships separately: [get it with NLTK's data downloader](https://www.nltk.org/data.html), and set `NLTK_DATA` when you install it somewhere other than the standard locations.

Stanza is [designed to work across many languages, using the Universal Dependencies formalism](https://stanfordnlp.github.io/stanza/#about). It's also the official Python interface to Stanford's Java CoreNLP, though its own pipeline doesn't need CoreNLP. You can [list the processors to load](https://stanfordnlp.github.io/stanza/getting_started.html#specifying-processors) with `processors=`. Pass all your documents to the pipeline [at once](https://stanfordnlp.github.io/stanza/getting_started.html#processing-multiple-documents), since a for loop over one sentence at a time is very slow. For a lot of text, [run it on a GPU](https://stanfordnlp.github.io/stanza/getting_started.html#controlling-devices). To keep the pipeline from downloading anything at runtime, [download the models ahead of time](https://stanfordnlp.github.io/stanza/getting_started.html#downloading-models-for-offline-usage).

jieba [segments Chinese text into words](https://github.com/fxsjy/jieba): accurate mode suits text analysis, and search engine mode cuts long words into short ones for better recall. Add your own words with `jieba.load_userdict()` to get higher accuracy, and for Traditional Chinese, switch to its bigger dictionary with `jieba.set_dictionary()`. The other picks work with it: spaCy can [use jieba as its Chinese segmenter](https://spacy.io/usage/models#chinese), and Stanza [supports it as a tokenizer](https://stanfordnlp.github.io/stanza/pipeline.html).

pypinyin [matches pinyin by whole words](https://github.com/mozillazg/python-pinyin), so it handles characters with more than one reading. It also writes zhuyin (Bopomofo) and Wade-Giles. When a wrong word split gives a wrong reading, [segment the text with jieba first](https://pypinyin.readthedocs.io/zh-cn/latest/faq.html) and pass in the list of words. For readings that are still wrong, [add your own](https://pypinyin.readthedocs.io/zh-cn/latest/usage.html#custom-dict) with `load_phrases_dict()` or `load_single_dict()`.

pangu.py [inserts spaces between CJK characters and letters, digits, and symbols](https://github.com/vinta/pangu.py). Call `pangu.space_text()` on a string or `pangu.space_file()` on a file. From the command line, `pangu-py -c` prints the corrected text and exits with 1 when the spacing needed fixing.

Check the license of the models and data, not only the library. spaCy is [MIT](https://github.com/explosion/spaCy/blob/master/LICENSE), but its [Spanish pipelines](https://spacy.io/models/es) are GPL and its [Italian ones](https://spacy.io/models/it) are for non-commercial use only. NLTK is [Apache](https://github.com/nltk/nltk/blob/develop/LICENSE.txt), and its corpora come [under various licenses](https://github.com/nltk/nltk/wiki/FAQ), each listed in its own README.
