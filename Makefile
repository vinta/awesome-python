-include .env
export

install:
	uv sync --locked

fetch_github_stars:
	uv run python website/fetch_github_stars.py

test:
	uv run pytest website/tests/ -v

build:
	uv run python website/build.py

preview: build
	uv run watchmedo shell-command \
		--patterns='*.md;*.html;*.css;*.js;*.py' \
		--recursive \
		--wait --drop \
		--command='uv run python website/build.py' \
		README.md website/templates website/static website/data & \
	python -m http.server -b 127.0.0.1 -d website/output/ 8000
