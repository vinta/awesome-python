Keep Python's datetime, and add zoneinfo for time zones and dateutil to parse date strings. For DST-safe types that replace datetime, use whenever.

How to choose:

- Time zones by IANA name, like Europe/Paris: zoneinfo
- Date strings in a common format you don't know in advance: python-dateutil
- Adding months, or recurring dates like every other Tuesday: python-dateutil
- Separate types for exact and local times, with DST-safe arithmetic: whenever
- Relative, multilingual, or scraped date text, like "3 days ago": dateparser
- A friendlier datetime API whose objects still work as datetimes: pendulum

### zoneinfo

Pick zoneinfo over dateutil's tz module for IANA time zones: it's in the standard library, and the datetime docs say [its usage is recommended](https://docs.python.org/3/library/datetime.html#tzinfo-objects). Pass a zone name to `ZoneInfo` and attach the result to a datetime. Add a day across a daylight saving change, and the result [takes the zone's new offset](https://docs.python.org/3/library/zoneinfo.html#using-zoneinfo).

### dateutil

Pick dateutil to parse date strings when you don't know the format in advance but it's a common one. Its [`parser.parse()`](https://dateutil.readthedocs.io/en/stable/parser.html) reads most known formats. It also adds calendar math: [relative deltas and iCalendar recurrence rules](https://dateutil.readthedocs.io/en/stable/), for things like next month, the last week of a month, or every other Tuesday.

### whenever

Pick whenever over Pendulum when you want separate types for exact and local times, so your type checker catches mixed-up naive and aware ones. It also [handles DST correctly in all arithmetic](https://whenever.readthedocs.io/en/latest/). Its docs say fixing the standard library's issues [needs a different API](https://whenever.readthedocs.io/en/latest/faq.html#why-no-drop-in-replacement-for-datetime), so it replaces datetime instead of extending it. Where other libraries expect a datetime, [convert to and from one](https://whenever.readthedocs.io/en/latest/guide/stdlib-convert.html). Start by [choosing a type](https://whenever.readthedocs.io/en/latest/guide/choosing-a-type.html): an `Instant` stores when something happened, regardless of location, and a zoned type keeps the local time too.

### dateparser

Pick dateparser for dates written by humans: relative dates like "two weeks ago", text in any of [more than 200 language locales](https://dateparser.readthedocs.io/en/latest/), or [scraped pages](https://dateparser.readthedocs.io/en/latest/#common-use-cases) that mix formats. It tries many formats and languages, which makes it slower, so keep dateutil for input in a common format. Start with [`dateparser.parse()`](https://dateparser.readthedocs.io/en/latest/#how-to-use).

### Pendulum

Pick Pendulum for an easier API that still hands datetimes to other code: its classes are [drop-in replacements that inherit from the native ones](https://pendulum.eustace.io/docs/#introduction), so most code that expects a datetime takes them. Its [`pendulum.datetime()`](https://pendulum.eustace.io/docs/#instantiation) helper creates a timezone-aware datetime, in UTC unless you pass a zone.
