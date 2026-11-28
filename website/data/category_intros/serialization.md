orjson decodes JSON into plain dicts, and msgspec into typed, validated objects. Pickle functions for remote workers with cloudpickle, or whole sessions with dill.

How to choose:

- JSON in and out as plain dicts and lists: orjson
- JSON or MessagePack decoded into typed objects, with validation: msgspec
- Lambdas and notebook-defined functions sent to remote workers: cloudpickle
- A drop-in pickle replacement, or saving a whole interpreter session: dill
- MessagePack without a schema, or a stream of messages: msgpack
- Your app's objects, like ORM models, mapped by separate schema classes: marshmallow

### orjson

Pick orjson when you want JSON in and out as plain dicts and lists, without defining a schema. It's [a fast, correct JSON library](https://github.com/ijl/orjson) that serializes dataclass, datetime, and UUID instances natively. Call `orjson.dumps()` and `orjson.loads()`. For typed objects back, use msgspec: decoding into dataclasses or other types [needs a schema](https://github.com/ijl/orjson#questions), which orjson leaves to libraries a level above it.

### msgspec

Pick msgspec when your messages have a known shape and you want typed objects back instead of dicts. msgspec's docs call [typed decoding](https://msgspec.dev/porting/orjson#typed-decoding) its main advantage over orjson. Validation happens in the same pass, so a missing field or a wrong type raises `msgspec.ValidationError`. Define each schema as a [`msgspec.Struct`](https://msgspec.dev/structs), the preferred way to describe structured data in msgspec. Then encode with `msgspec.json.encode()` and decode with `msgspec.json.decode(data, type=User)`. JSON, MessagePack, YAML, and TOML each get a submodule with [the same interface](https://msgspec.dev/usage).

### cloudpickle

Pick cloudpickle to send code to worker processes or remote machines. It's [especially useful for cluster computing](https://github.com/cloudpipe/cloudpickle), where Python code ships over the network to run on remote hosts. It also pickles what the standard library's `pickle` doesn't support, like lambdas and the functions and classes you define in a script, a shell, or a Jupyter notebook. Dump with `cloudpickle.dumps()`, and load on the other end with plain `pickle.loads()`. It's built for objects in transit: both ends need the exact same version of Python, and its README strongly discourages using it for long-term storage.

### dill

Pick dill to pickle more of Python than `pickle` can, or to save a whole interpreter session. It [extends `pickle` with the same interface](https://github.com/uqfoundation/dill#about-dill), so it works as [a drop-in replacement](https://github.com/uqfoundation/dill#basic-usage): change `import pickle` to `import dill as pickle`. `dill.dump_module()` [pickles the state of `__main__` to a file](https://dill.readthedocs.io/en/latest/#dill.dump_module), and `dill.load_module()` restores it, even in a new interpreter on another computer.

### MessagePack for Python

Pick MessagePack for Python, imported as `msgpack`, for MessagePack data without a schema: a binary format that [exchanges data across languages like JSON, but faster and smaller](https://github.com/msgpack/msgpack-python#what-is-this). Pack with `msgpack.packb()` and unpack with `msgpack.unpackb()`. For many messages in a row, the [streaming `Unpacker`](https://github.com/msgpack/msgpack-python#streaming-unpacking) reads one object after another from a file-like object, or from bytes you `feed()` it. When your messages have a schema to decode into, msgspec reads MessagePack too.

### marshmallow

Pick marshmallow to convert your app's objects to and from native Python types through schema classes kept apart from those objects. It [works with just about any ORM, ODM, or no ORM at all](https://marshmallow.readthedocs.io/en/latest/why.html#agnostic), and [one schema can produce several output formats](https://marshmallow.readthedocs.io/en/latest/why.html#consistency-meets-flexibility), like a full view and a smaller one for a low-latency endpoint. [Declare a schema](https://marshmallow.readthedocs.io/en/latest/quickstart.html#declaring-schemas) as a class whose attributes are fields. Its `dump()` serializes an object, and `load()` validates and deserializes input, raising `ValidationError` on invalid data.

### Loading untrusted pickles

Only unpickle data you trust, whether cloudpickle or dill wrote it: loading a pickle can run any code its author put in it. cloudpickle's README says to [only load pickle data from trusted sources](https://github.com/cloudpipe/cloudpickle), and dill's says it's [not intended to be secure against maliciously constructed data](https://github.com/uqfoundation/dill#about-dill).
