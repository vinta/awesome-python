"""Tests for fetch_github_stars module."""

import json

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

    def test_skips_graphql_injection_in_owner(self):
        query = build_graphql_query(['org"){evil}/repo'])
        assert query == ""

    def test_skips_graphql_injection_in_name(self):
        query = build_graphql_query(['org/repo"){evil}'])
        assert query == ""

    def test_skips_owner_starting_with_hyphen(self):
        query = build_graphql_query(["-bad/repo"])
        assert query == ""

    def test_skips_owner_starting_with_dot(self):
        query = build_graphql_query([".bad/repo"])
        assert query == ""

    def test_skips_repo_starting_with_dot(self):
        query = build_graphql_query(["org/.hidden"])
        assert query == ""

    def test_allows_repo_with_dots_and_underscores(self):
        query = build_graphql_query(["org/my_repo.py"])
        assert 'name: "my_repo.py"' in query

    def test_allows_hyphenated_owner(self):
        query = build_graphql_query(["my-org/repo"])
        assert 'owner: "my-org"' in query

    def test_skips_owner_with_underscore(self):
        query = build_graphql_query(["bad_owner/repo"])
        assert query == ""


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

    def test_extracts_last_commit_at(self):
        data = {
            "repo_0": {
                "stargazerCount": 100,
                "owner": {"login": "org"},
                "defaultBranchRef": {"target": {"committedDate": "2025-06-01T00:00:00Z"}},
            }
        }
        repos = ["org/repo"]
        result = parse_graphql_response(data, repos)
        assert result["org/repo"]["last_commit_at"] == "2025-06-01T00:00:00Z"

    def test_missing_default_branch_ref(self):
        data = {"repo_0": {"stargazerCount": 50, "owner": {"login": "org"}}}
        repos = ["org/repo"]
        result = parse_graphql_response(data, repos)
        assert result["org/repo"]["last_commit_at"] == ""


class TestMainSkipsFreshCache:
    """Verify that main() skips fetching when all cache entries are fresh."""

    def test_skips_fetch_when_cache_is_fresh(self, tmp_path, monkeypatch, capsys):
        from datetime import datetime, timedelta, timezone

        from fetch_github_stars import main

        # Set up a minimal README with one repo
        readme = tmp_path / "README.md"
        readme.write_text("* [req](https://github.com/psf/requests) - HTTP.\n")
        monkeypatch.setattr("fetch_github_stars.README_PATH", readme)

        # Pre-populate cache with a fresh entry (1 hour ago)
        data_dir = tmp_path / "data"
        data_dir.mkdir()
        cache_file = data_dir / "github_stars.json"
        now = datetime.now(timezone.utc)
        fresh_cache = {
            "psf/requests": {
                "stars": 52000,
                "owner": "psf",
                "last_commit_at": "2025-01-01T00:00:00+00:00",
                "fetched_at": (now - timedelta(hours=1)).isoformat(),
            },
            "vinta/awesome-python": {
                "stars": 230000,
                "owner": "vinta",
                "last_commit_at": "2025-01-01T00:00:00+00:00",
                "fetched_at": (now - timedelta(hours=1)).isoformat(),
            },
        }
        cache_file.write_text(json.dumps(fresh_cache), encoding="utf-8")
        monkeypatch.setattr("fetch_github_stars.CACHE_FILE", cache_file)
        monkeypatch.setattr("fetch_github_stars.DATA_DIR", data_dir)
        monkeypatch.setenv("GITHUB_TOKEN", "fake-token")

        main()

        output = capsys.readouterr().out
        assert "0 repos to fetch" in output
        assert "Cache is up to date" in output

    def test_fetches_when_cache_is_stale(self, tmp_path, monkeypatch, capsys):
        from datetime import datetime, timedelta, timezone
        from unittest.mock import MagicMock

        from fetch_github_stars import main

        # Set up a minimal README with one repo
        readme = tmp_path / "README.md"
        readme.write_text("* [req](https://github.com/psf/requests) - HTTP.\n")
        monkeypatch.setattr("fetch_github_stars.README_PATH", readme)

        # Pre-populate cache with a stale entry (24 hours ago)
        data_dir = tmp_path / "data"
        data_dir.mkdir()
        cache_file = data_dir / "github_stars.json"
        now = datetime.now(timezone.utc)
        stale_cache = {
            "psf/requests": {
                "stars": 52000,
                "owner": "psf",
                "last_commit_at": "2025-01-01T00:00:00+00:00",
                "fetched_at": (now - timedelta(hours=24)).isoformat(),
            },
            "vinta/awesome-python": {
                "stars": 230000,
                "owner": "vinta",
                "last_commit_at": "2025-01-01T00:00:00+00:00",
                "fetched_at": (now - timedelta(hours=24)).isoformat(),
            },
        }
        cache_file.write_text(json.dumps(stale_cache), encoding="utf-8")
        monkeypatch.setattr("fetch_github_stars.CACHE_FILE", cache_file)
        monkeypatch.setattr("fetch_github_stars.DATA_DIR", data_dir)
        monkeypatch.setenv("GITHUB_TOKEN", "fake-token")

        # Mock httpx.Client to avoid real API calls
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "data": {
                "repo_0": {
                    "stargazerCount": 53000,
                    "owner": {"login": "psf"},
                    "defaultBranchRef": {"target": {"committedDate": "2025-06-01T00:00:00Z"}},
                },
                "repo_1": {
                    "stargazerCount": 231000,
                    "owner": {"login": "vinta"},
                    "defaultBranchRef": {"target": {"committedDate": "2025-06-01T00:00:00Z"}},
                },
            }
        }
        mock_response.raise_for_status = MagicMock()
        mock_client = MagicMock()
        mock_client.__enter__ = MagicMock(return_value=mock_client)
        mock_client.__exit__ = MagicMock(return_value=False)
        mock_client.post.return_value = mock_response
        monkeypatch.setattr("fetch_github_stars.httpx.Client", lambda **kwargs: mock_client)

        main()

        output = capsys.readouterr().out
        assert "2 repos to fetch" in output
        assert "Done. Fetched 2 repos" in output
        mock_client.post.assert_called_once()
