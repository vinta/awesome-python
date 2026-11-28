Pydantic checks API payloads and other records against your type hints, jsonschema against a JSON Schema. Whole datasets go to Pandera or Great Expectations.

How to choose:

- API payloads and other records, with the schema written as type hints: Pydantic
- Data checked against a JSON Schema document, often shared across languages: jsonschema
- Dataframes checked inside your own functions, in pandas, Polars, or PySpark: Pandera
- Data quality tests on databases, files, and dataframes, with reports to share: Great Expectations

### Pydantic

Pick Pydantic when you write the schema in Python and validate records one at a time, like API payloads. It [defines the schema with Python type hints](https://pydantic.dev/docs/validation/latest/get-started/why/#type-hints): subclass [`BaseModel`](https://pydantic.dev/docs/validation/latest/get-started/), annotate each field, and pass in your data. Pydantic either raises `ValidationError` or [guarantees that the fields conform to their types](https://pydantic.dev/docs/validation/latest/concepts/models/). By default it [coerces data to the right type](https://pydantic.dev/docs/validation/latest/get-started/why/#strict-lax), so a numeric string becomes an `int`. Pydantic also [generates a JSON Schema from any model](https://pydantic.dev/docs/validation/latest/get-started/why/#json-schema), for self-documenting APIs and other tools that read the format. For a whole dataframe, pick Pandera, which validates the table instead of one row at a time.

### jsonschema

Pick jsonschema when your schema is a JSON Schema document, a format [often used for portability across languages](https://python-jsonschema.readthedocs.io/en/latest/faq/). It's [an implementation of the JSON Schema specification for Python](https://python-jsonschema.readthedocs.io/en/latest/), and it takes the schema as a plain Python dict, like what `json.load()` returns. [The `validate()` function](https://python-jsonschema.readthedocs.io/en/latest/validate/#the-basics) is the simplest way to check an instance against a schema. jsonschema can also [report all validation errors](https://python-jsonschema.readthedocs.io/en/latest/#features) through a validator's `iter_errors()`.

### Pandera

Pick Pandera to validate dataframes in your own code, from column types to [statistical checks like hypothesis testing](https://pandera.readthedocs.io/en/latest/). One schema validates pandas, Polars, Dask, Modin, Ibis, and PySpark dataframes. Write it as a `DataFrameModel` class, in a style inspired by dataclasses and Pydantic. Then decorate your functions with [`@check_types`](https://pandera.readthedocs.io/en/latest/dataframe_models.html#basic-usage), and their `DataFrame[Schema]` inputs and outputs get validated at run time. A `DataFrameModel` also [works as a field in a Pydantic model](https://pandera.readthedocs.io/en/latest/pydantic_integration.html).

### Great Expectations

Pick Great Expectations to test data quality as a step of your pipeline, such as [validating raw data before writing it to your warehouse](https://docs.greatexpectations.io/docs/reference/learn/gx_in_your_data_pipeline/gx_in_your_data_pipeline_lp/). Its open-source library is GX Core, which connects to [SQL databases, files, and pandas or Spark dataframes](https://docs.greatexpectations.io/docs/core/connect_to_data/). Each Expectation is [a verifiable assertion about data](https://docs.greatexpectations.io/docs/core/introduction/gx_overview/#define-expectations), like an assertion in a unit test, and an Expectation Suite groups them. Every workflow [follows the same steps](https://docs.greatexpectations.io/docs/core/introduction/gx_overview/#the-pattern-of-a-gx-workflow): set up a Data Context with `gx.get_context()`, connect to data, define Expectations, and run Validations. Data Docs publish your suites and results as human-readable pages.
