Handle time zones with the built-in zoneinfo. Parsing date strings and adding months is where a Python date library earns its install: python-dateutil.

How to choose:

- Time zones by IANA name, like Europe/Paris: zoneinfo
- Parsing date strings, adding months, and recurring dates: python-dateutil
- Dates as people write them, like "3 days ago", in many languages: dateparser
- An easier datetime API whose objects are still datetimes: pendulum
- Exact and local times as separate types, with DST-safe math: whenever

zoneinfo brings the IANA time zone database to Python, and the datetime docs say [its usage is recommended](https://docs.python.org/3/library/datetime.html#tzinfo-objects). Attach a ZoneInfo to a datetime [through the constructor, `replace()`, or `astimezone()`](https://docs.python.org/3/library/zoneinfo.html#using-zoneinfo). Some systems, Windows among them, have no IANA database, so if your code runs across platforms, [declare a dependency on tzdata](https://docs.python.org/3/library/zoneinfo.html#data-sources).

python-dateutil adds [extensions to the standard datetime module](https://dateutil.readthedocs.io/en/stable/); install it as `python-dateutil` and import it as `dateutil`. Its parser [reads most known formats](https://dateutil.readthedocs.io/en/stable/parser.html) and returns a datetime even for an ambiguous date. For input like 01/05/09, set `dayfirst` or `yearfirst` to match your data. For calendar math, `relativedelta` takes [plural arguments that add and singular ones that replace](https://dateutil.readthedocs.io/en/stable/relativedelta.html): `months=+1` moves a month ahead, and `day=1` jumps to the first. `rrule` builds [recurring dates from iCalendar rules](https://dateutil.readthedocs.io/en/stable/rrule.html).

dateparser reads relative dates like "two weeks ago" and absolute ones in more than 200 language locales. Its docs say it [stands out](https://dateparser.readthedocs.io/en/latest/#common-use-cases) for scraped pages, logs, and other data from mixed sources, and for letting users type dates in their own words. Call `dateparser.parse()`, and [pass `languages` when you know them](https://dateparser.readthedocs.io/en/latest/#how-to-use), so it skips language detection. When you parse many dates from one source, [use `DateDataParser`](https://dateparser.readthedocs.io/en/latest/usage.html), which remembers the languages it has found.

pendulum's classes are [drop-in replacements for the native ones](https://pendulum.eustace.io/docs/#introduction), since they inherit from datetime. Every instance is time zone aware and in UTC by default. Its docs call aware datetimes [the preferred and recommended way](https://pendulum.eustace.io/docs/#instantiation) to use it. For tests, install `pendulum[test]` and [travel in time](https://pendulum.eustace.io/docs/#testing).

whenever puts exact time and local time in [separate types](https://whenever.readthedocs.io/en/latest/guide/choosing-a-type.html): an instant when only the moment matters, a zoned datetime when the local time matters too. Mixing up naive and aware [becomes a type error](https://whenever.readthedocs.io/en/latest/), and DST is handled in all arithmetic. A standard datetime [does no time zone adjustment](https://docs.python.org/3/library/datetime.html#datetime-objects) when you add a timedelta to it. In production, [turn whenever's DST warnings into errors](https://whenever.readthedocs.io/en/latest/faq.html#why-warnings-instead-of-errors) with Python's standard warnings filter.

Decide whether you extend datetime or replace it. zoneinfo, python-dateutil, and dateparser all use standard datetime objects, so they work together. pendulum's objects are datetimes too, but code that checks the exact type, like sqlite3 and some database drivers, [needs an adapter registered](https://pendulum.eustace.io/docs/#limitations). whenever [doesn't subclass datetime at all](https://whenever.readthedocs.io/en/latest/faq.html#why-no-drop-in-replacement-for-datetime), so [convert to and from standard datetimes](https://whenever.readthedocs.io/en/latest/guide/stdlib-convert.html) where other code needs one.
