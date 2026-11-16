Python's built-in dataclasses write a class's boilerplate methods for you. When fields need validators or converters, attrs is the dataclass alternative to use.

How to choose:

- Classes that mainly hold data, with no dependency to add: dataclasses
- Fields that need validators or converters: attrs
- Dot access on loosely structured dicts, like parsed JSON or YAML: python-box
- A two-way mapping you keep updating: bidict
- Faster UUIDs from a drop-in replacement for the uuid module: uuid-utils

### dataclasses

Pick dataclasses for classes that mainly hold data: it ships with Python, so your project gains no dependency. Put the `@dataclass` decorator on a class with its fields declared as type annotations, and it [adds the constructor, repr, and other special methods](https://docs.python.org/3/library/dataclasses.html) for you.

### attrs

Pick attrs once a dataclass stops being enough, when your fields need validators to check their values or converters to normalize them. Start your classes with `attrs.define()`, which its docs [recommend for new code](https://www.attrs.org/en/latest/names.html#tl-dr).

### Box

Pick Box for data that arrives as loosely structured dicts, like parsed JSON or YAML, when you'd rather reach into it with dot notation than brackets. Box's author keeps it for data whose structure you don't know in advance. attrs' docs say the same from the other side: a dict with [a fixed and known set of keys](https://www.attrs.org/en/latest/why.html#dicts) should be a class. Wrap the dict in `Box`, [a subclass of dict](https://github.com/cdgriffith/Box) that turns every dict you add into a Box too, so dot access works at any depth.

### bidict

Pick bidict for a mapping you look up in both directions and keep changing. Use it like a dict, and look up a key by its value through its `inverse` attribute, which [stays in sync](https://bidict.readthedocs.io/en/main/intro.html#why-can-t-i-just-use-a-dict) as you update the mapping.

### uuid-utils

Pick uuid-utils when your code generates enough UUIDs that speed matters. It's a [drop-in replacement for Python's uuid module](https://aminalaee.github.io/uuid-utils/latest/). Its own benchmarks show it beating the standard library. Some frameworks need the standard library's own UUID objects; for them, `uuid_utils.compat` [returns those instead](https://aminalaee.github.io/uuid-utils/latest/#compatibility-with-python-uuid).

### Validating untrusted data

attrs' docs say it doesn't try to be a validation library. For [parsing and validating untrusted data](https://www.attrs.org/en/latest/why.html#pydantic), they point to a validation library, which works alongside attrs or dataclasses rather than replacing them.
