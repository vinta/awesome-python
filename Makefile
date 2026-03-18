-include .env
export

install:
	uv sync

fetch_stats:
	uv run python website/fetch_github_stars.py

build:
	uv run python website/build.py

preview: build
	@echo "Check the website on http://localhost:8000"
	uv run watchmedo shell-command \
		--patterns='*.md;*.html;*.css;*.js;*.py' \
		--recursive \
		--wait --drop \
		--command='uv run python website/build.py' \
		README.md website/templates website/static website/data & \
	python -m http.server -b 127.0.0.1 -d website/output/ 8000
