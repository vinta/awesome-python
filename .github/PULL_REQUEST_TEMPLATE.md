## Summary

Add another processing script - `pypify.py` to apply to `README.md` after `sort.py`. 

This script will add one-liners to each _installable_ library / package in 
README.md with a script to install it through pip. These one-liners are scraped from PyPI. 

See docs in `pypify.py`.

**EXAMPLE:**

Current line featuring the flower package:
```
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.
```

After pypify:
```
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery. **INSTALL**: `pip install flower`
```

The resulting enhanced `README.md` can be post-processed by other scripts to scrape the 
package info and give the user the ability to install them automatically in some package manager.

## TODO

- Maybe add exporting `README.md` to some structured format, e.g. JSON, YAML, Pandas, Excel, etc.
