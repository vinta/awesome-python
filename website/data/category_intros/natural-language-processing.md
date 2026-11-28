Build production NLP pipelines with spaCy, or learn NLP from NLTK's book. Stanza trades speed for accuracy, and Gensim trains topic models and word vectors.

How to choose:

- An app that pulls information out of large volumes of text: spaCy
- Learning or teaching NLP, with classic algorithms and corpora to try: NLTK
- Accuracy over speed, with neural models for many languages: Stanza
- Topic models, or word vectors trained on your own corpus: Gensim
- Chinese word segmentation: jieba
- Hanzi to pinyin: pypinyin
- Traditional and Simplified Chinese, with each region's wording: OpenCC
- Spaces between CJK characters and Latin letters or digits: pangu.py

### spaCy

Pick spaCy to build an app that processes text in production. Its docs say it's [specifically designed for production use](https://spacy.io/usage/facts-figures), and probably not a good choice if your goal is to write papers and run benchmarks. spaCy is integrated and opinionated: it tries not to make you choose between algorithms that do the same job. Start with one of [the small, default packages](https://spacy.io/usage/spacy-101), which its docs call always a good start, and load it with `spacy.load()`.

### NLTK

Pick NLTK to learn or teach NLP. Its creators wrote [Natural Language Processing with Python](https://www.nltk.org/book/) around it, a book that introduces programming fundamentals alongside computational linguistics. NLTK gives you [corpora and lexical resources such as WordNet](https://www.nltk.org/), plus libraries for tokenizing, stemming, tagging, parsing, and classification. For an app headed to production, pick spaCy, whose docs say NLTK was [created as a platform for teaching and research](https://spacy.io/usage/spacy-101). NLTK's recommended word tokenizer is [`word_tokenize()`](https://www.nltk.org/api/nltk.tokenize.word_tokenize.html).

### Stanza

Pick Stanza when accuracy matters more than speed. On tokenizing, Stanza's docs say its neural pipeline [can achieve significantly higher accuracy](https://stanfordnlp.github.io/stanza/tokenize.html), while spaCy's rule-based tokenizer runs much faster on large-scale text. The Stanford NLP Group made it for [the linguistic analysis of many human languages](https://stanfordnlp.github.io/stanza/), with models built on PyTorch that run best on a GPU. Build a [`stanza.Pipeline`](https://stanfordnlp.github.io/stanza/getting_started.html) for your language and pass it your text.

### Gensim

Use Gensim next to spaCy or NLTK to find topics in a corpus or to train word vectors on it. spaCy's docs name Gensim as a tool to [train a word vectors table](https://spacy.io/usage/embeddings-transformers). Gensim's algorithms include [Word2Vec, FastText, LSI, and LDA](https://radimrehurek.com/gensim/intro.html), and they stream the corpus, so it never has to fit in RAM. Feed models like `Word2Vec` a corpus written as an iterable that [returns one document at a time](https://radimrehurek.com/gensim/auto_examples/core/run_corpora_and_vector_spaces.html).

### jieba

Pick jieba to split Chinese text into words. Its [accurate mode](https://github.com/fxsjy/jieba) suits text analysis, and its search engine mode cuts long words into shorter ones to raise recall in a search index. Call `jieba.cut()` on your text, and add your domain's words to a custom dictionary to segment them more accurately.

### pypinyin

Pick pypinyin to turn hanzi into pinyin, for phonetic annotation, sorting, or search. It [matches phrases](https://github.com/mozillazg/python-pinyin) to pick the right reading of a character with several pronunciations, and also writes Zhuyin and Wade-Giles. Start with `pinyin()`, which returns each character's reading.

### OpenCC

Pick OpenCC to convert between Traditional and Simplified Chinese, including [the regional wording of Mainland China, Taiwan, and Hong Kong](https://github.com/BYVoid/OpenCC), like 鼠標 and 滑鼠. Its conversion is dictionary-based and deterministic, so results stay predictable and it runs offline. Create an `opencc.OpenCC` converter with the config for your target region.

### pangu.py

Pick pangu.py to [insert spaces between CJK characters and Latin letters, digits, and symbols](https://github.com/vinta/pangu.py). Call `pangu.space_text()` on a string to get it back spaced.

### Processing many texts

spaCy and Stanza both run faster on batches than one text at a time. spaCy's docs say to [process the texts as a stream using `nlp.pipe`](https://spacy.io/usage/processing-pipelines#processing), and Stanza's call it [essential to run the pipeline on batches of documents](https://stanfordnlp.github.io/stanza/getting_started.html).
