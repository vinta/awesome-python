site_install:
	pip install mkdocs==0.16.3
	pip install mkdocs-material==1.12.2

site_link:
	ln -sf $(CURDIR)/README.md $(CURDIR)/docs/index.md

site_preview: site_link
	mkdocs serve

site_deploy: site_link
	mkdocs gh-deploy --clean
