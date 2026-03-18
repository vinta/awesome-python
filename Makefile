site_install:
	uv sync --no-dev

fetch_stars:
	uv run python website/fetch_github_stars.py

site_build:
	uv run python website/build.py

site_preview: site_build
	python -m http.server -d website/output/ 8000

site_deploy: site_build
	@echo "Deploy via GitHub Actions (push to master)"
