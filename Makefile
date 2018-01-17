BASEDIR=$(CURDIR)
DOCDIR=$(BASEDIR)/docs

install:
	pip install mkdocs==0.16.3
	pip install mkdocs-material==1.12.2

link:
	ln -sf $(BASEDIR)/README.md $(DOCDIR)/index.md

preview: link
	mkdocs serve

deploy: link
	mkdocs gh-deploy --clean
