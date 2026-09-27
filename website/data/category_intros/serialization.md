When your Python serialization library should validate too, msgspec decodes JSON straight into typed objects. Without a schema, orjson is fast and correct.

How to choose:

- Decoding into typed, validated objects: msgspec
- Faster JSON that still gives you dicts and lists: orjson
- Compact binary data other languages can read: msgpack
- Schemas that convert ORM or app objects for a web API: marshmallow

msgspec works as a faster JSON or MessagePack library on its own. Still, its docs recommend it for the [full serialization and validation workflow](https://github.com/msgspec/msgspec): define your schemas with type annotations, encode them, then decode them back with validation. [Structs are the preferred way](https://msgspec.dev/structs) to define those types. Pass the type when you decode, and msgspec [validates while decoding](https://msgspec.dev/usage#typed-decoding) at no added runtime cost: `msgspec.json.decode(data, type=User)`. A consistent interface covers MessagePack, YAML, and TOML too.

Moving from the standard `json` module to orjson? The [largest difference](https://github.com/ijl/orjson?tab=readme-ov-file#migrating) is that `orjson.dumps` returns `bytes`, not `str`. orjson serializes dataclasses, datetimes, and UUIDs natively. Decoding gives you only dicts, lists, and other builtins, and orjson leaves schemas to [validation libraries a level above](https://github.com/ijl/orjson?tab=readme-ov-file#questions).

msgpack reads and writes MessagePack, a binary format that [lets you exchange data among languages like JSON, but faster and smaller](https://github.com/msgpack/msgpack-python). Call `packb` and `unpackb` for one-shot use, and read many objects from one stream with an [`Unpacker`](https://github.com/msgpack/msgpack-python?tab=readme-ov-file#streaming-unpacking). When the data comes from an untrusted source, [set `max_buffer_size`](https://msgpack-python.readthedocs.io/en/latest/api.html#msgpack.Unpacker) to limit the buffer.

marshmallow [makes no assumption about your web framework or database layer](https://marshmallow.readthedocs.io/en/latest/why.html#agnostic), so its schemas work with just about any ORM, or none. [Declare a schema](https://marshmallow.readthedocs.io/en/latest/quickstart.html#declaring-schemas) as a class that maps attribute names to fields. Its `dump` method turns your objects into primitive Python types, and `load` [validates and deserializes](https://marshmallow.readthedocs.io/en/latest/quickstart.html#deserializing-objects-loading) incoming data, raising `ValidationError` on invalid input. To get objects back instead of dicts, [decorate a schema method with `post_load`](https://marshmallow.readthedocs.io/en/latest/quickstart.html#deserializing-to-objects).

orjson, msgspec, and msgpack all pitch speed, but msgspec's own benchmark page [encourages you to write your own benchmarks](https://msgspec.dev/benchmarks) before deciding.
