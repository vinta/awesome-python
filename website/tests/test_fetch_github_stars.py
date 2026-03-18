"""Tests for fetch_github_stars module."""

import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from fetch_github_stars import (
    build_graphql_query,
    extract_github_repos,
    parse_graphql_response,
    save_cache,
)


class TestExtractGithubRepos:
    def test_extracts_owner_repo_from_github_url(self):
        readme = "* [requests](https://github.com/psf/requests) - HTTP lib."
        result = extract_github_repos(readme)
        assert result == {"psf/requests"}

    def test_multiple_repos(self):
        readme = (
            "* [requests](https://github.com/psf/requests) - HTTP.\n"
            "* [flask](https://github.com/pallets/flask) - Micro."
        )
        result = extract_github_repos(readme)
        assert result == {"psf/requests", "pallets/flask"}

    def test_ignores_non_github_urls(self):
        readme = "* [pypy](https://foss.heptapod.net/pypy/pypy) - Fast Python."
        result = extract_github_repos(readme)
        assert result == set()

    def test_ignores_github_io_urls(self):
        readme = "* [docs](https://user.github.io/project) - Docs site."
        result = extract_github_repos(readme)
        assert result == set()

    def test_ignores_github_wiki_and_blob_urls(self):
        readme = (
            "* [wiki](https://github.com/org/repo/wiki) - Wiki.\n"
            "* [file](https://github.com/org/repo/blob/main/f.py) - File."
        )
        result = extract_github_repos(readme)
        assert result == set()

    def test_handles_trailing_slash(self):
        readme = "* [lib](https://github.com/org/repo/) - Lib."
        result = extract_github_repos(readme)
        assert result == {"org/repo"}

    def test_deduplicates(self):
        readme = (
            "* [a](https://github.com/org/repo) - A.\n"
            "* [b](https://github.com/org/repo) - B."
        )
        result = extract_github_repos(readme)
        assert result == {"org/repo"}

    def test_strips_fragment(self):
        readme = "* [lib](https://github.com/org/repo#section) - Lib."
        result = extract_github_repos(readme)
        assert result == {"org/repo"}


class TestSaveCache:
    def test_creates_directory_and_writes_json(self, tmp_path, monkeypatch):
        data_dir = tmp_path / "data"
        cache_file = data_dir / "stars.json"
        monkeypatch.setattr("fetch_github_stars.DATA_DIR", data_dir)
        monkeypatch.setattr("fetch_github_stars.CACHE_FILE", cache_file)
        save_cache({"a/b": {"stars": 1}})
        assert cache_file.exists()
        assert json.loads(cache_file.read_text(encoding="utf-8")) == {"a/b": {"stars": 1}}


class TestBuildGraphqlQuery:
    def test_single_repo(self):
        query = build_graphql_query(["psf/requests"])
        assert "repository" in query
        assert 'owner: "psf"' in query
        assert 'name: "requests"' in query
        assert "stargazerCount" in query

    def test_multiple_repos_use_aliases(self):
        query = build_graphql_query(["psf/requests", "pallets/flask"])
        assert "repo_0:" in query
        assert "repo_1:" in query

    def test_empty_list(self):
        query = build_graphql_query([])
        assert query == ""

    def test_skips_repos_with_quotes_in_name(self):
        query = build_graphql_query(['org/"bad"'])
        assert query == ""

    def test_skips_only_bad_repos(self):
        query = build_graphql_query(["good/repo", 'bad/"repo"'])
        assert "good" in query
        assert "bad" not in query


class TestParseGraphqlResponse:
    def test_parses_star_count_and_owner(self):
        data = {
            "repo_0": {
                "stargazerCount": 52467,
                "owner": {"login": "psf"},
            }
        }
        repos = ["psf/requests"]
        result = parse_graphql_response(data, repos)
        assert result["psf/requests"]["stars"] == 52467
        assert result["psf/requests"]["owner"] == "psf"

    def test_skips_null_repos(self):
        data = {"repo_0": None}
        repos = ["deleted/repo"]
        result = parse_graphql_response(data, repos)
        assert result == {}

    def test_handles_missing_owner(self):
        data = {"repo_0": {"stargazerCount": 100}}
        repos = ["org/repo"]
        result = parse_graphql_response(data, repos)
        assert result["org/repo"]["owner"] == ""

    def test_multiple_repos(self):
        data = {
            "repo_0": {"stargazerCount": 100, "owner": {"login": "a"}},
            "repo_1": {"stargazerCount": 200, "owner": {"login": "b"}},
        }
        repos = ["a/x", "b/y"]
        result = parse_graphql_response(data, repos)
        assert len(result) == 2
        assert result["a/x"]["stars"] == 100
        assert result["b/y"]["stars"] == 200
