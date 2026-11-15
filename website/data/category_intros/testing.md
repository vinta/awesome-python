Write your tests in pytest, a Python testing framework that also runs unittest suites. Robot Framework suits acceptance tests non-technical stakeholders must read.

How to choose:

- Tests written in Python: pytest, plus Hypothesis to generate their inputs
- Acceptance tests that non-technical stakeholders read: Robot Framework
- Running your tests across Python versions: tox, or Nox to write the setup in Python
- New browser tests: Playwright
- Staying on Selenium: Selenium, or SeleniumBase for built-in waits and a pytest runner
- Load tests written in Python: Locust
- Benchmarks inside your pytest suite: pytest-benchmark
- Tests generated from an API schema: Schemathesis
- Replacing objects or the clock: unittest.mock, or time-machine for the current time
- HTTP calls: responses for Requests, RESPX for HTTPX, VCR.py to record and replay
- Test objects: factory_boy for ORM models, Polyfactory for type-hinted classes
- Code coverage: Coverage.py
- Fake values: Faker, or Mimesis for structured records from a schema

### pytest

Pick pytest for a new test suite, and move an old one onto it gradually. It [runs unittest-based tests out of the box](https://docs.pytest.org/en/latest/how-to/unittest.html), so `pytest tests` collects your `TestCase` classes while you write new tests in pytest's style. Tests are plain functions with [only plain `assert` statements](https://docs.pytest.org/en/latest/): when one fails, pytest shows the values involved, so there are no `self.assert*` names to remember. Shared setup goes in [fixtures](https://docs.pytest.org/en/latest/explanation/fixtures.html) instead of xUnit-style setup and teardown methods, and each test requests its fixtures by name.

### Robot Framework

Pick Robot Framework when test cases must read as requirements that [non-technical project stakeholders understand](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#behavior-driven-style). Each test is built from keywords and their arguments, and you can add your own keywords through [libraries written in Python](https://robotframework.org/). Every run writes its results as HTML reports and logs.

### Hypothesis

Add Hypothesis when hand-picked examples might miss an edge case. You describe a range of inputs, and Hypothesis [randomly chooses which of them to check](https://hypothesis.readthedocs.io/en/latest/), edge cases included. Decorate a test with [`@given`](https://hypothesis.readthedocs.io/en/latest/quickstart.html) and a strategy for each argument. It stays a regular function, so pytest runs it as usual.

### tox

Pick tox to run your tests in several Python environments from declarative config. It [checks that your package builds and installs correctly](https://tox.wiki/en/latest/) in each environment, then runs your tests against that installed package. pytest's docs say this [helps detect packaging glitches](https://docs.pytest.org/en/latest/explanation/goodpractices.html#tox). tox recommends writing the config [in TOML](https://tox.wiki/en/latest/tutorial/getting-started.html): list your environments in a `tox.toml` at your project root.

### Nox

Pick Nox over tox when your test setup needs logic of its own. tox's own docs describe Nox as [using Python scripts instead of a configuration file](https://tox.wiki/en/latest/explanation.html), for when tox's configuration feels too limiting. Each session is a function in `noxfile.py`, and a list of versions passed to [`@nox.session`](https://nox.thea.codes/en/latest/tutorial.html) runs it against each of those interpreters.

### Playwright

Pick Playwright for new end-to-end browser tests: it was [created specifically](https://playwright.dev/python/docs/intro) for them, and it drives Chromium, WebKit, and Firefox. Before each action, it [auto-waits](https://playwright.dev/python/docs/actionability) until the element passes its checks. Its docs recommend the `pytest-playwright` plugin, which gives each test a fresh browser context. They also recommend locating elements the way a user finds them, like [`get_by_role()`](https://playwright.dev/python/docs/locators), instead of by CSS or XPath.

### Selenium

Keep Selenium for an existing Selenium suite. It implements [the W3C WebDriver specification](https://www.selenium.dev/documentation/), so the same code runs in every major browser, and Selenium Manager handles the browser drivers for you. By default, Selenium doesn't wait for an element that hasn't loaded yet. Its docs call [explicit waits](https://www.selenium.dev/documentation/webdriver/waits/) a great choice to name the exact condition each step waits for.

### SeleniumBase

Pick SeleniumBase to stay on Selenium with a framework around it: it [uses Selenium's WebDriver APIs and incorporates test runners like pytest](https://seleniumbase.io/). Its methods wait for elements with default timeouts, and failing tests save screenshots. Write each test class as a subclass of `BaseCase`.

### Locust

Pick Locust to write load tests [in regular Python code](https://docs.locust.io/en/latest/what-is-locust.html), not in a GUI or a domain-specific language. Define an [`HttpUser`](https://docs.locust.io/en/latest/quickstart.html) class whose `@task` methods make requests in a `locustfile.py`, run `locust`, and start the test from its web UI.

### pytest-benchmark

Use pytest-benchmark to time code inside your pytest suite. Request its [`benchmark` fixture](https://pytest-benchmark.readthedocs.io/en/latest/) in a test and pass it the function to measure. The plugin calibrates the runs for you and can compare results with earlier ones to track regressions.

### Schemathesis

Pick Schemathesis when your API has an OpenAPI or GraphQL schema, or gRPC service descriptors: it [generates property-based tests](https://schemathesis.readthedocs.io/en/latest/) from it and chains the calls into realistic workflows. Run `schemathesis run` with your schema's URL, or call it from pytest. Each failure comes with [a curl command that reproduces it](https://schemathesis.readthedocs.io/en/latest/quick-start/).

### unittest.mock

Use the standard library's unittest.mock to replace an object your code calls and check how it was used. [Patch where the object is looked up](https://docs.python.org/3/library/unittest.mock.html#where-to-patch), which isn't always where it's defined.

### responses

Pick responses when your code calls Requests. Register mock responses and decorate the test with [`@responses.activate`](https://github.com/getsentry/responses).

### RESPX

Pick RESPX when your code calls HTTPX. Patch HTTPX with [`respx.mock`](https://lundberg.github.io/respx/), then add routes that return mock responses. In pytest, the `respx_mock` fixture does the patching for you.

### VCR.py

Pick VCR.py to test against real HTTP responses without calling the server on every run. The first run [records each request and response to a cassette file](https://vcrpy.readthedocs.io/en/latest/), and later runs replay it. When the API changes, delete the cassettes and run the tests again to record new ones. It hooks into [many HTTP libraries](https://vcrpy.readthedocs.io/en/latest/installation.html), Requests and HTTPX among them.

### time-machine

Pick time-machine to set the current time in tests. Its docs call mocking `datetime` with unittest.mock [fragile](https://time-machine.readthedocs.io/en/latest/comparison.html), since that covers only the import the mock targets. time-machine mocks the standard library's time functions everywhere they're referenced. Use [`time_machine.travel()`](https://time-machine.readthedocs.io/en/latest/usage.html) as a decorator or a context manager, or the pytest plugin's `time_machine` fixture.

### factory_boy

Pick factory_boy to build test objects from ORM models: it's [designed to work well with](https://factoryboy.readthedocs.io/en/latest/) Django, MongoDB, and SQLAlchemy. A factory declares a default for each field once, and each test [overrides only the fields it needs](https://factoryboy.readthedocs.io/en/latest/introduction.html), like `UserFactory(firstname="Jack")`. Subclass `factory.Factory` and set `model` in its `Meta` class to your model. For an ORM model, start from that ORM's subclass instead.

### Polyfactory

Pick Polyfactory when your models carry type hints: it [supports dataclasses, TypedDicts, Pydantic models, msgspec Structs](https://polyfactory.litestar.dev/latest/), and more. It reads each field's type to generate its value. Subclass `DataclassFactory[Person]` without declaring any fields, and its [`build()`](https://polyfactory.litestar.dev/latest/getting-started.html) returns a filled-in `Person`.

### Coverage.py

Use Coverage.py to see which code your tests never run: it [notes which parts of your code ran](https://coverage.readthedocs.io/en/latest/) and finds the code that could have run but didn't. Run `coverage run -m pytest` in place of `pytest`, then read the results with `coverage report -m` or `coverage html`.

### Faker

Pick Faker for fake names, addresses, and other values in your tests. Call [`Faker.seed()`](https://faker.readthedocs.io/en/latest/) to get the same data on every run. In pytest, its [`faker` fixture](https://faker.readthedocs.io/en/latest/pytest-fixtures.html) is reseeded before each test.

### Mimesis

Pick Mimesis to generate structured records from a schema: it [offers schema-based generators](https://mimesis.name/latest/about.html) for data of any complexity. It isn't an object factory tied to a database or ORM. For data in one language, its docs recommend [the `Generic()` class](https://mimesis.name/latest/quickstart.html), which reaches every provider through one object.

### More testing resources

For more, see [awesome-python-testing](https://github.com/cleder/awesome-python-testing) for testing tools and [awesome-pytest](https://github.com/augustogoulart/awesome-pytest) for pytest resources.
