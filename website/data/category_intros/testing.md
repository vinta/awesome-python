pytest runs your unittest suites unchanged, so switching Python testing frameworks costs no rewrite. Hypothesis and Playwright tests run inside it too.

How to choose:

- Unit and integration tests: pytest
- Tests that generate their own inputs: Hypothesis
- End-to-end browser tests: Playwright
- Acceptance tests that non-programmers can read: Robot Framework
- Testing across Python versions: tox, or Nox to configure it in Python
- WebDriver tests on remote machines: Selenium, or SeleniumBase with waits and reports built in
- Load tests written as Python code: Locust
- API tests generated from an OpenAPI or GraphQL schema: Schemathesis
- Replacing objects in a test: unittest.mock, or time-machine for the clock
- Faking HTTP calls: responses for Requests, RESPX for HTTPX, VCR.py to record real traffic
- Test objects: factory_boy for ORM models, Polyfactory for typed classes
- Code coverage: Coverage.py
- Fake names and addresses: Faker, or Mimesis for speed

Write pytest tests as plain functions with plain `assert` statements: [pytest's assertion introspection](https://docs.pytest.org/en/stable/getting-started.html) reports the intermediate values when one fails, so there are no assert methods to remember. Share setup through [fixtures](https://docs.pytest.org/en/stable/explanation/fixtures.html#improvements-over-xunit-style-setup-teardown-functions), which a test requests by name, instead of xUnit-style setup and teardown. pytest also [runs unittest-based suites](https://docs.pytest.org/en/stable/how-to/unittest.html), so you can move an old suite over a test at a time.

Hypothesis tests take a [`@given` decorator](https://hypothesis.readthedocs.io/en/latest/quickstart.html#write-your-first-test) with a strategy describing the inputs, and Hypothesis picks which inputs to try, edge cases included. They're still regular functions that pytest or unittest runs.

Playwright's docs call [its pytest plugin](https://playwright.dev/python/docs/intro#installing-playwright-pytest) the recommended way to write end-to-end tests, and every test gets a fresh browser context. Playwright [waits for elements to be actionable](https://playwright.dev/python/docs/actionability) before each action, and its assertions wait for the expected condition. [Locate elements by role](https://playwright.dev/python/docs/locators#quick-guide) and other user-facing attributes, not CSS or XPath, which break as the DOM changes.

Robot Framework writes test cases in a [tabular, keyword-driven syntax](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#why-robot-framework), builds higher-level keywords from existing ones, and reports results in HTML. Custom keyword libraries are plain Python. In [behavior-driven style](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#behavior-driven-style), a test case reads as a requirement stakeholders who don't code can follow.

tox and Nox both create a virtual environment per Python version or dependency set and run your tests in each. tox defines its environments in [a config file](https://tox.wiki/en/latest/tutorial/getting-started.html#creating-your-first-configuration). Nox is [configured in a `noxfile.py`](https://nox.thea.codes/en/stable/tutorial.html#writing-the-configuration-file), where each session is a Python function, so any logic your test matrix needs is ordinary code.

Selenium drives browsers through WebDriver, a W3C standard, and [Selenium Grid](https://www.selenium.dev/documentation/overview/) runs those tests on other machines and platforms. Its guidelines model each page as a [page object](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/) that makes no assertions, and use [explicit waits](https://www.selenium.dev/documentation/webdriver/waits/#explicit-waits) for the exact condition each step needs. [SeleniumBase](https://github.com/seleniumbase/SeleniumBase) builds on Selenium and runs under pytest: its methods wait for an element before acting, and failing tests save screenshots.

A Locust test is [a Python program](https://docs.locust.io/en/stable/quickstart.html): an `HttpUser` class whose tasks make requests, so complex user flows are just code.

Schemathesis reads your OpenAPI or GraphQL schema and generates property-based tests from it, with no per-endpoint tests to maintain. Its FAQ [recommends the CLI](https://schemathesis.readthedocs.io/en/stable/faq/#how-should-i-run-schemathesis) for most users, with a pytest integration for existing suites.

With unittest.mock, [patch a name where it's looked up](https://docs.python.org/3/library/unittest.mock.html#where-to-patch), which isn't always where it's defined. [Autospec](https://docs.python.org/3/library/unittest.mock.html#autospeccing) your mocks, so a test fails when your code calls an API the real object lacks. For the clock, time-machine [mocks time functions everywhere they're referenced](https://time-machine.readthedocs.io/en/latest/comparison.html), where a patch only reaches the import location it targets.

For HTTP, pick by client. responses mocks Requests calls in a test [wrapped in `@responses.activate`](https://github.com/getsentry/responses#basics), and RESPX mocks HTTPX, with a [`respx_mock` fixture](https://lundberg.github.io/respx/) for pytest. VCR.py [records real HTTP interactions](https://vcrpy.readthedocs.io/en/latest/) to a cassette file on the first run and replays them after, across many client libraries.

factory_boy replaces static fixtures with factories, where a test declares only the fields it cares about. It has [base classes for Django, SQLAlchemy, and MongoEngine](https://factoryboy.readthedocs.io/en/stable/#orm-integration) models. Polyfactory instead [reads the type hints](https://polyfactory.litestar.dev/latest/getting-started.html#example) on dataclasses, TypedDicts, Pydantic models, and msgspec Structs to generate the data.

Run your suite under Coverage.py with [`coverage run -m pytest`](https://coverage.readthedocs.io/en/latest/#quick-start), then `coverage report` prints the results. For most purposes, you need no pytest plugin.

Faker generates names, addresses, and other data [per locale](https://faker.readthedocs.io/en/master/#localization). Mimesis covers the same ground, fully typed, and [its benchmarks](https://mimesis.name/latest/benchmarks.html) show it faster than Faker.

Random test data makes a failing build hard to reproduce, so seed it: [Faker](https://faker.readthedocs.io/en/master/#seeding-the-generator), [factory_boy](https://factoryboy.readthedocs.io/en/stable/#reproducible-random-values), and [Mimesis](https://mimesis.name/latest/random_and_seed.html) all take a seed. For more tools, see [awesome-python-testing](https://github.com/cleder/awesome-python-testing).
