Use pytest as your Python testing framework. Add Hypothesis to find the edge cases you missed, and Playwright to test in a real browser.

How to choose:

- Unit and integration tests: pytest
- Property-based tests: Hypothesis
- Running the suite across Python versions or dependency sets: tox, or nox if you'd rather configure it in Python
- End-to-end browser tests: Playwright
- An existing Selenium suite, or tests spread across many machines with Selenium Grid: Selenium, or SeleniumBase for a pytest-ready framework on top of it
- Acceptance tests in a readable keyword syntax: Robot Framework
- Load testing: Locust
- An API with an OpenAPI or GraphQL schema: Schemathesis
- Faking HTTP: responses for Requests, RESPX for HTTPX, VCR.py to record and replay real traffic
- Freezing the clock: freezegun
- Test data: factory_boy for ORM models, Polyfactory for dataclasses and Pydantic models, Faker or Mimesis for single fake values
- Coverage: coverage.py

With pytest, write tests as plain functions with `assert`, and share setup through fixtures, which pytest says [offer dramatic improvements](https://docs.pytest.org/en/stable/explanation/fixtures.html) over xUnit-style setup and teardown. For a new project, its good practices recommend [the `importlib` import mode](https://docs.pytest.org/en/stable/explanation/goodpractices.html) and a `src` layout. You don't have to rewrite an old unittest suite first: pytest [runs it as is](https://docs.pytest.org/en/stable/how-to/unittest.html), so you can move it over one file at a time.

A Hypothesis test is a pytest test with `@given` on top. You describe the inputs with strategies, and Hypothesis picks the values, [including edge cases you might not have thought about](https://hypothesis.readthedocs.io/en/latest/). It still works with fixtures and `parametrize`.

For the browser, Playwright calls its pytest plugin, pytest-playwright, [the recommended way to write end-to-end tests](https://playwright.dev/python/docs/intro). Find elements by what the user sees, [starting with `get_by_role()`](https://playwright.dev/python/docs/locators), and assert with `expect()`, which keeps retrying until the condition is met or it times out.

Run tox or nox locally and in CI. pytest's own docs point to tox because it [tests the installed package, not your checkout](https://docs.pytest.org/en/stable/explanation/goodpractices.html), which catches packaging mistakes.

For coverage, run `coverage run --branch -m pytest`. You don't need a pytest plugin for it: coverage.py calls one [unnecessary for most purposes](https://coverage.readthedocs.io/en/latest/).

When you mock with `unittest.mock`, [patch where an object is looked up](https://docs.python.org/3/library/unittest.mock.html#where-to-patch), not where it's defined. Pass `autospec=True` too, so a call with the wrong signature raises a `TypeError`.
