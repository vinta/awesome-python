For a Python validation library, use Pydantic for data coming into your app, jsonschema when a JSON Schema is the contract, and Pandera for dataframes.

How to choose:

- API payloads, config files, anything you can describe with type hints: Pydantic
- A JSON Schema shared with other languages or teams: jsonschema
- pandas, Polars, or PySpark dataframes: Pandera

With Pydantic, describe your data as a `BaseModel` with type hints. Parse JSON with `model_validate_json()`, not `model_validate(json.loads(...))`, as [its performance tips](https://pydantic.dev/docs/validation/latest/concepts/performance/) recommend. For a type that isn't a model, like `list[Item]`, create one `TypeAdapter` and reuse it.

Pydantic is forgiving by default: it turns `"123"` into `123` and ignores fields your model doesn't declare. When that's too loose, turn on [strict mode](https://pydantic.dev/docs/validation/latest/concepts/strict_mode/) or set `extra='forbid'`.

With jsonschema, `validate()` checks the schema itself on every call. To validate many documents against one schema, [create a validator once](https://python-jsonschema.readthedocs.io/en/stable/validate/) and reuse it, like `Draft202012Validator(schema)`. The `format` keyword checks nothing until you pass a `format_checker`, and [`default` doesn't fill in missing fields](https://python-jsonschema.readthedocs.io/en/stable/faq/).

With Pandera, write a `DataFrameModel`, which [works like a Pydantic model](https://pandera.readthedocs.io/en/stable/dataframe_models.html) for your columns. Decorate pipeline functions with `@pa.check_types` to validate what goes in and what comes out. Pass `lazy=True` to [get every failure in one report](https://pandera.readthedocs.io/en/stable/lazy_validation.html), not just the first.

Validate once, where untrusted data enters your program: a request body, a config file, a CSV upload. After that, [Pydantic guarantees](https://pydantic.dev/docs/validation/latest/concepts/models/) the fields match their types, so don't check them again deeper in. The same goes for schemas: if other teams need a JSON Schema, [generate it from your Pydantic models](https://pydantic.dev/docs/validation/latest/concepts/json_schema/) instead of writing it twice.
