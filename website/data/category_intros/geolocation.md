From Python, geopy calls a geolocation API to turn addresses into coordinates and back. GeoPandas analyzes map data, and GeoDjango stores it in a Django app.

How to choose:

- Addresses to coordinates, or coordinates to addresses: geopy
- Distance between two latitude and longitude points: geopy
- Map data files, like shapefiles or GeoJSON, analyzed as a table: GeoPandas
- A Django site that stores, queries, or edits map data: GeoDjango
- A visitor's location from their IP address, in a Django project: GeoDjango
- GeoJSON objects built and validated in plain Python: geojson

### geopy

Pick geopy to turn addresses into coordinates from your code, or the other way around. It's [a Python client for several popular geocoding web services](https://geopy.readthedocs.io/en/latest/), with one class per service in `geopy.geocoders`. Which service it calls is your second choice, since [geopy is not a service](https://geopy.readthedocs.io/en/latest/#geopy-is-not-a-service). Services have different terms of use, quotas, and pricing, so read the terms of the one you pick, and try another when it doesn't work for you. Create the geocoder for your service, call `geocode()` with an address, and read `.latitude` and `.longitude` from the result. Services that define `reverse()` turn a coordinate pair back into an address.

### GeoPandas

Pick GeoPandas to analyze map data in a script or notebook, with each shape as a row in a table. It [extends the datatypes used by pandas to allow spatial operations on geometric types](https://geopandas.org/en/latest/), with Shapely running the geometry. That lets you do work in Python that would otherwise need a spatial database. Load a file with [`geopandas.read_file()`](https://geopandas.org/en/latest/getting_started/introduction.html), which detects the file type and returns a GeoDataFrame, and write it back with `to_file()`. For a column of addresses, `geopandas.geocode()` [geocodes through geopy](https://geopandas.org/en/latest/docs/user_guide/geocoding.html).

### GeoDjango

Pick GeoDjango when a Django site stores, queries, or edits map data. It's [a contrib module that turns Django into a geographic web framework](https://docs.djangoproject.com/en/stable/ref/contrib/gis/tutorial/), with model fields for geometries, spatial lookups in the ORM, and geometry editing in the admin. Since it's part of Django, it's a pick only inside a Django project. Its docs [recommend PostGIS](https://docs.djangoproject.com/en/stable/ref/contrib/gis/install/) as the spatial database. Add `django.contrib.gis` to `INSTALLED_APPS`, define geometry fields from `django.contrib.gis.db.models`, and filter on them with spatial lookups like `contains`. To locate a visitor, its [GeoIP2 object](https://docs.djangoproject.com/en/stable/ref/contrib/gis/geoip2/) looks up the city and coordinates of an IP address in a GeoIP database file you supply.

### geojson

Pick geojson to build, validate, and serialize GeoJSON objects in plain Python. If your data already lives in GeoPandas, skip it, since GeoPandas [reads and writes GeoJSON files](https://geopandas.org/en/latest/docs/user_guide/io.html) on its own. It has [classes for all GeoJSON objects](https://github.com/jazzband/geojson), like `Point`, `Feature`, and `FeatureCollection`, and its `dumps()` and `loads()` wrap the `json` functions of the same name. Check an object with its `is_valid` property.

### Distance between coordinates

Latitude and longitude are degrees on a curved Earth, so measuring the distance between two points needs math that accounts for the curve. For two points, geopy's [`geodesic()`](https://geopy.readthedocs.io/en/latest/#module-geopy.distance) is accurate to round-off. GeoPandas operations are planar, so [re-project to a projected CRS](https://geopandas.org/en/latest/getting_started/introduction.html#Projections) in meters or feet with `to_crs()` before you measure distance or area.
