Skip hand-written dunder methods, and when you compare Python dataclass alternatives, pick attrs for its validators and converters. Box gives dicts dot access.

How to choose:

- Classes with generated dunder methods, validators, and converters: attrs
- Dicts read with dot notation, nested ones included: python-box
- Looking up a key by its value, with both directions in sync: bidict
- A faster drop-in for the `uuid` module: uuid-utils

attrs [writes the dunder methods](https://www.attrs.org/en/latest/) that implement object protocols, so you don't have to. For new code, its docs [recommend the modern API](https://www.attrs.org/en/latest/names.html#tl-dr): `@define` on the class and `field()` for an attribute, or `@frozen` for immutable instances, with slots on by default. Type annotations stay optional. The standard library's dataclasses [gave up features for simplicity](https://www.attrs.org/en/latest/why.html#data-classes), like validators and converters, so a class that needs them goes to attrs. It [isn't a full serialization library](https://www.attrs.org/en/latest/overview.html#what-attrs-is-not), though: to serialize and validate your attrs classes, its docs point you to its sibling project, cattrs.

python-box installs Box, a [`dict` subclass](https://github.com/cdgriffith/Box) whose keys you can also read as attributes, even ones like `"imdb stars"`. Nested dicts and lists become Box and BoxList objects, so dot access works all the way down: `movie_box.Robin_Hood_Men_in_Tights.imdb_stars`. It [reads and writes JSON, YAML, TOML, and msgpack](https://github.com/cdgriffith/Box/wiki/Converters) with methods like `from_json()` and `to_json()`, and `to_dict()` gives you plain dicts back. Keep Box for data whose keys change: attrs' docs say a dict with a fixed and known set of keys [is an object, not a hash](https://www.attrs.org/en/latest/why.html#dicts), and belongs in a class.

bidict gives you [bidirectional mappings](https://bidict.readthedocs.io/intro.html) that work like dicts: look up a value by its key as usual, or a key by its value through `.inverse`, which stays in sync as you update the mapping. A single dict holding both directions mixes keys with values. Modeling the mapping correctly takes two one-way mappings kept in sync, [which is what bidict does](https://bidict.readthedocs.io/intro.html#why-can-t-i-just-use-a-dict) under the hood.

uuid-utils is a [fast, drop-in replacement for Python's `uuid` module](https://aminalaee.github.io/uuid-utils/latest/), powered by Rust. Import it under the module's name, `import uuid_utils as uuid`, and call `uuid.uuid4()` or `uuid.uuid7()` as usual. Django and some other frameworks require the standard library's own `uuid.UUID` instances. For those, [import `uuid_utils.compat`](https://aminalaee.github.io/uuid-utils/latest/#compatibility-with-python-uuid) instead, which returns them and still outperforms the standard library.
