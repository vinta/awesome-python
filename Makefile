BASEDIR=$(CURDIR)
DOCDIR=$(BASEDIR)/docs

install:
	pip install mkdocs

preview:
	mkdocs serve

deploy:
	ln -sf $(BASEDIR)/README.md $(DOCDIR)/index.md
	mkdocs gh-deploy --clean
