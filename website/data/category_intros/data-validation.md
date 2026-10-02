Pydantic checks API input against your type hints. Python data validation extends to dataframes in Pandera, where each column gets a type hint.

How to choose:

- API payloads and other records, typed with hints: Pydantic
- Dataframes in pandas, Polars, PySpark, and more: Pandera
- Data checked against a JSON Schema document: jsonschema
- Data quality checks on databases and files, with alerts and reports: Great Expectations

Pydantic [takes its schema from Python type hints](https://pydantic.dev/docs/validation/latest/get-started/why/#type-hints), so your type checker and IDE read the same code it validates. Subclass `BaseModel` and annotate its fields, then pass untrusted data to the model: if no `ValidationError` is raised, [every field matches its declared type](https://pydantic.dev/docs/validation/latest/concepts/models/). Your models can also [generate JSON Schema](https://pydantic.dev/docs/validation/latest/get-started/why/#json-schema) for self-documenting APIs and other tools.

Pandera [validates pandas, Polars, PySpark, and other dataframes against one schema](https://pandera.readthedocs.io/en/latest/). Write that schema as a `DataFrameModel`, [much the way you'd define a Pydantic model](https://pandera.readthedocs.io/en/latest/dataframe_models.html), with a typed field per column. Then decorate your pipeline functions with `check_types()`, which [validates both inputs and outputs](https://pandera.readthedocs.io/en/latest/decorators.html#check-inputs-and-outputs) from their type annotations.

jsonschema [implements the JSON Schema specification](https://python-jsonschema.readthedocs.io/en/latest/), so the schema is a JSON document rather than Python code. That suits a schema that has to work outside Python too, since JSON Schema [establishes a common language for data exchange](https://json-schema.org/overview/what-is-jsonschema) across systems. Declare `$schema` in each schema to [identify which version it's written for](https://python-jsonschema.readthedocs.io/en/latest/referencing/).

Great Expectations is [a framework for describing data with expressive tests](https://docs.greatexpectations.io/docs/core/introduction/gx_overview/#gx-core-components-and-workflows) and validating data against them, from databases to files in cloud storage. Every script [starts by creating a Data Context](https://docs.greatexpectations.io/docs/core/set_up_a_gx_environment/create_a_data_context/). Group your production Expectations into [Expectation Suites](https://docs.greatexpectations.io/docs/core/define_expectations/organize_expectation_suites/), and run those through [a Checkpoint](https://docs.greatexpectations.io/docs/core/introduction/gx_overview/#run-validations), which can send email or Slack alerts and write the results to Data Docs, a human-readable report.

Records and tables need different validators, but the picks work together. A Pandera `DataFrameModel` [works as a field on a Pydantic model](https://pandera.readthedocs.io/en/latest/pydantic_integration.html), with Pydantic checking the built-in types next to it. Pandera's maintainer suggests [Pandera for in-memory dataframes and Great Expectations for data on disk](https://github.com/unionai-oss/pandera/discussions/598). Pandera needs zero configuration, while Great Expectations takes some setup up front.
