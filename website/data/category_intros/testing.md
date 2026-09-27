Plain assert statements and fixtures make pytest the Python testing framework for new code. Add Hypothesis for property-based tests, Playwright for browsers.

How to choose:

- Writing tests: pytest, plus Hypothesis for edge cases; Robot Framework for non-programmers
- Tests across Python versions: tox, or Nox to configure them in Python
- Browser tests: Playwright; Selenium or SeleniumBase for WebDriver suites
- Load tests written in Python: Locust
- Tests generated from an OpenAPI or GraphQL schema: Schemathesis
- Mocking: unittest.mock; responses, RESPX, or VCR.py for HTTP; FreezeGun for time
- Test objects: factory_boy for ORM models, Polyfactory for type hints
- Code coverage: Coverage.py
- Fake data: Faker or Mimesis

pytest lets you write tests with [plain `assert` statements](https://docs.pytest.org/en/stable/) and shows you what failed. It also runs your unittest suites as they are, so you can [move an old suite over bit by bit](https://docs.pytest.org/en/stable/how-to/unittest.html). Share setup through [fixtures](https://docs.pytest.org/en/stable/how-to/fixtures.html): use `yield` fixtures for teardown, and put the ones several test modules need in `conftest.py`. For a new project, pytest's docs recommend a src layout and the [importlib import mode](https://docs.pytest.org/en/stable/explanation/goodpractices.html).

Hypothesis adds property-based tests to pytest or unittest. You describe the inputs with a strategy passed to [`@given`](https://hypothesis.readthedocs.io/en/latest/quickstart.html), and Hypothesis picks which ones to try, including edge cases you didn't think of. It's [an addition to unit tests, not always a replacement](https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html): start with round trips like encode/decode, and with tests you already parametrize. Use the [most general strategy](https://hypothesis.readthedocs.io/en/latest/explanation/domain.html) your test should pass for.

Robot Framework is a [keyword-driven framework for acceptance testing](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html). Tests are tables of keywords, and you build higher-level keywords out of existing ones. That suits teams where people who don't write Python read or write the tests.

tox and Nox both run your tests in separate virtual environments, one per Python version or task. Configure tox [in TOML](https://tox.wiki/en/latest/tutorial/getting-started.html), in `tox.toml` or `pyproject.toml`. It tests the installed package, not your checkout, so it [catches packaging mistakes](https://docs.pytest.org/en/stable/explanation/goodpractices.html). Nox is configured in Python, in a `noxfile.py`, and tox's own docs point you to it [if tox configuration is too limiting](https://tox.wiki/en/latest/explanation.html).

Playwright was [created for end-to-end testing](https://playwright.dev/python/docs/intro) and runs Chromium, Firefox, and WebKit. Write your tests with its pytest plugin, which gives each test its own browser context. Playwright [waits for elements to be ready](https://playwright.dev/python/docs/actionability) before each action, so you don't add waits yourself. Find elements [by role, text, or test id](https://playwright.dev/python/docs/locators) rather than CSS or XPath, which break when the page changes.

Selenium drives real browsers through WebDriver, on your machine or on remote ones through Selenium Grid. Keep it for the WebDriver suites you already have. It [doesn't structure your test suite for you](https://www.selenium.dev/documentation/test_practices/), so run it under a test runner like pytest, and use [explicit waits](https://www.selenium.dev/documentation/webdriver/waits/) for the exact condition you need. SeleniumBase builds on Selenium's WebDriver APIs and [runs under pytest](https://github.com/seleniumbase/SeleniumBase), and its methods wait for elements that need time to load.

For load tests, Selenium's docs [advise against using it](https://www.selenium.dev/documentation/test_practices/discouraged/performance_testing/); use Locust. You [write the tests in regular Python code](https://docs.locust.io/en/stable/what-is-locust.html): a `User` class with `@task` methods. When you need more load, [run one worker per CPU core](https://docs.locust.io/en/stable/running-distributed.html).

Schemathesis generates property-based tests from your OpenAPI or GraphQL schema, using Hypothesis under the hood. Its docs [recommend the CLI for most users](https://schemathesis.readthedocs.io/en/stable/faq/), since the pytest integration has fewer features.

unittest.mock ships with Python. [Patch where an object is looked up](https://docs.python.org/3/library/unittest.mock.html), not where it's defined, and add `autospec=True` so your tests fail when the real API changes. For code you own, pytest's docs suggest you [pass dependencies in](https://docs.pytest.org/en/stable/how-to/monkeypatch.html) rather than patch them.

For HTTP, pick the mock that matches your client: responses for requests, and RESPX for HTTPX. Both raise an error on requests you didn't mock. VCR.py records real responses to a cassette file and replays them, with many clients including both. [Filter out credentials](https://vcrpy.readthedocs.io/en/latest/advanced.html) before you commit cassettes. For time, FreezeGun [freezes `datetime` and `time`](https://github.com/spulec/freezegun) at the moment you choose.

factory_boy [replaces static fixtures with factories](https://factoryboy.readthedocs.io/en/stable/) that set only the fields a test cares about, and works with Django, SQLAlchemy, and MongoDB models. Polyfactory [builds objects from type hints](https://polyfactory.litestar.dev/latest/): dataclasses, TypedDicts, Pydantic models, and more.

For the data itself, Faker [generates localized fake data](https://faker.readthedocs.io/en/master/) and comes with a pytest fixture; factory_boy uses it too. Mimesis is [fully typed and generates data from schemas](https://mimesis.name/latest/about.html), in many languages.

Coverage.py measures which lines your tests run. Run pytest under it with [`coverage run -m pytest`](https://coverage.readthedocs.io/en/latest/), which its docs say is enough for most purposes, and include your tests in the measurement. It measures lines by default; add [`--branch`](https://coverage.readthedocs.io/en/latest/branch.html) to see which branches never ran.

Write each test so it [runs in any order](https://www.selenium.dev/documentation/test_practices/discouraged/test_dependency/), without relying on other tests. A [flaky test](https://docs.pytest.org/en/stable/explanation/flaky.html) usually means state the test doesn't control, and random data is one such state: seed Faker, Mimesis, factory_boy, and Polyfactory so a [failing build reproduces](https://factoryboy.readthedocs.io/en/stable/).
