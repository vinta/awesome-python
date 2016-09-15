BASEDIR=$(CURDIR)
DOCDIR=$(BASEDIR)/docs

install:
	pip install mkdocs

link:
	ln -sf $(BASEDIR)/README.md $(DOCDIR)/index.md

preview:
	$(MAKE) link
	mkdocs serve

deploy:
	$(MAKE) link
	mkdocs gh-deploy --clean
	
#just here in it class nothing to do with ur code tho lol k bi
