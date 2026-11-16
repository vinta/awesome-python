Read typed settings from environment variables with Pydantic Settings. Dynaconf layers config files per environment, and Hydra composes ML experiment configs.

How to choose:

- Typed settings from environment variables and `.env` files, or a FastAPI app: pydantic-settings
- Config files in several formats, sections per environment, Vault secrets, or Django and Flask settings: dynaconf
- ML experiments composed from YAML files and overridden per run on the command line: hydra-core
- An INI file read with only the standard library: configparser
- A `.env` file loaded into environment variables, and nothing more: python-dotenv

### Pydantic Settings

Pick Pydantic Settings for an app that takes its settings from environment variables, especially one already on Pydantic: [FastAPI's settings guide](https://fastapi.tiangolo.com/advanced/settings/#pydantic-settings) uses it. Subclass [`BaseSettings`](https://pydantic.dev/docs/validation/latest/concepts/pydantic_settings/#usage) and annotate each field. Pydantic Settings then fills each field from the environment variable of the same name and converts it to the annotated type, and a value that doesn't fit raises a validation error. Besides the environment, it reads [secrets files and the AWS, Azure, and Google Cloud secret managers](https://pydantic.dev/docs/validation/latest/concepts/pydantic_settings/#secrets).

### Dynaconf

Pick Dynaconf when your settings live in files: it reads [TOML, YAML, JSON, and INI files](https://www.dynaconf.com/settings_files/). Where Pydantic Settings declares each setting in a class, Dynaconf takes whatever keys your files hold. A file can hold [one section per environment](https://www.dynaconf.com/#layered-environments-on-files), like development and production, and an environment variable picks the section at run time. In a Django or Flask project, Dynaconf [replaces the framework's settings object](https://www.dynaconf.com/#initialize-dynaconf-on-your-project), so your code keeps reading settings the usual way. Start with [`dynaconf init`](https://www.dynaconf.com/#using-python-only), which writes a settings file and a secrets file. For passwords and tokens in production, its docs recommend its built-in HashiCorp Vault support.

### Hydra

Pick Hydra for ML experiments and research code, where each run [composes its config from YAML files and overrides values on the command line](https://hydra.cc/docs/intro/). A config group is a folder of alternatives, like one file per database or model, and a run picks one by name. Keep [each experiment in a config file that holds only its changes to the defaults](https://hydra.cc/docs/patterns/configuring_experiments/). Decorate your main function with `@hydra.main`, which becomes your script's entry point and [brings tab completion, multirun, and Hydra's working directory and logging management](https://hydra.cc/docs/advanced/compose_api/#when-to-use-the-compose-api).

### python-dotenv

Use python-dotenv when your app already reads its settings from environment variables, and you only want a `.env` file to set them during development, as [12-factor apps do](https://saurabh-kumar.com/python-dotenv/). Call [`load_dotenv()`](https://saurabh-kumar.com/python-dotenv/#getting-started) at startup: it finds the `.env` file next to your script or higher up the directory tree and adds each key-value pair to the environment. Values stay strings, with no types or validation. Skip it when you use Pydantic Settings or Dynaconf, since both [can read `.env` files themselves](https://pydantic.dev/docs/validation/latest/concepts/pydantic_settings/#dotenv-env-support).

### configparser

Use configparser when an INI file is enough and you want no dependency outside the standard library. Its files are [easy for end users to edit](https://docs.python.org/3/library/configparser.html), and it [stores every value as a string](https://docs.python.org/3/library/configparser.html#supported-datatypes), with getter methods to convert integers, floats, and booleans. Pass [`read()`](https://docs.python.org/3/library/configparser.html#configparser.ConfigParser.read) a list of possible locations, such as the current directory, the user's home directory, and a system-wide directory, and it reads every file that exists.

### Environment variables and secrets

Pydantic Settings, Dynaconf, and python-dotenv all let environment variables win over files, and Dynaconf's docs [recommend keeping your settings in environment variables](https://www.dynaconf.com/envvars/). Set the values that change per deployment as environment variables, and keep any `.env` or secrets file that holds passwords [out of git](https://saurabh-kumar.com/python-dotenv/#getting-started).
