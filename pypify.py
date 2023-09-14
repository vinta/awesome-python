#!/usr/bin/env python
# coding: utf-8

"""
This script will add one-liners to each _installable_ library / package in 
README.md with a script to install it through pip. These one-liners are scraped from PyPI.

EXAMPLE:

Current line featuring the flower package:
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.

After pypify:
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery. **INSTALL**: `pip install flower`

The resulting enhanced README.md can be post-processed by other scripts to scrape the 
package info and give the user the ability to install them automatically in some package manager.
"""

# -----------------------------------------------------------# 

import re, sys
from typing import Callable, Optional
from pathlib import Path
import requests
import logging
import urllib3

# -----------------------------------------------------------#

# switch DEBUG flag on/off to show additional output in logs 
DEBUG = False
# switch this to True for strict homepage verification on PyPI (to avoid false positive matches)
VERIFY_HOMEPAGE = False

# path to this project directory
THISDIR = Path(__file__).parent
# the target README file
README = THISDIR / 'README.md'
# newline symbol
NL = '\n'
# default log file encoding
ENC = 'utf-8'
# tab symbol
TAB = ' ' * 4
# footer marker
RESOURCES = '# Resources'
# regex for package lines in README
RPATTERN = re.compile(r'.*\[(.+)\]\((http.*)\)\s*\-\s*(.*)', re.I) # 1) (name), 2) (homepage), 3) (description)
# PyPI URL pattern for project
PYPI = 'https://pypi.org/project/{}/'
# replacement map for package names
REPLACE_URL = {'_': '-', ' ': '-'}
# default HTTP headers
HEADERS = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
           'Accept': 'text/html; text/plain; text/*'}
# requests session (global)
SESSION = requests.Session()
SESSION.headers.update(HEADERS)
# disable SSL verification
SESSION.verify = False

# output log to file log.log in current directory
logging.basicConfig(filename=THISDIR / 'log.log', filemode='w', style='{',
                    format='{asctime} | {message}', datefmt='%d.%m.%Y %H:%M:%S',
                    encoding=ENC, level=logging.DEBUG if DEBUG else logging.INFO)
# ...but also to stdout console
logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))
# disable annoying SSL warnings
urllib3.disable_warnings()

# -----------------------------------------------------------# 

def readme_process(readme: str, line_callback: Optional[Callable] = None) -> str:
    """
    Process README 'body' (the packages section) applying the given callback function 
    to each package line in the text and returning the altered README section.

    PARAMS:
        - readme (str): the packages section in README (from the end of the TOC to the Resources section) as a single string
        - line_callback (callable): callback function to apply to package lines in the text. Callback signature is as follows:
            PARAMS:
                - (int): line index number (0-based)
                - (str): raw package line text, e.g. "* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery."
                - (str): extracted package name, e.g. "flower"
                - (str): extracted package URL, e.g. "https://github.com/mher/flower"
                - (str): extracted package summary, e.g. "Real-time monitor and web admin for Celery."
            RETURNS:
                (str | None): altered line as a string or None if no change is made to the original line
    RETURNS:
        (str): altered README body (packages section).
    """
    # return original text if no callback was supplied
    if line_callback is None: return readme
    # split text into individual lines
    lines = readme.split(NL)
    # for each line
    for i, line in enumerate(lines):
        # skip standard Python packages
        if '(Python standard library)' in line: continue
        # parse using the precompiled regex pattern for packages
        m = re.match(RPATTERN, line)
        # if not a package line, go to next line
        if not m: continue
        # get callback result for this line
        res = line_callback(i, line, m[1], m[2], m[3])
        # if the result is a valid string, replace the original line with it
        if res: lines[i] = res
    # return the entire text pieced together
    return NL.join(lines)

# -----------------------------------------------------------# 

def parse_pypi(pknames: list[str], homepage: Optional[str] = None, 
               verify_homepage: Optional[bool] = VERIFY_HOMEPAGE) -> str:
    """
    Fetches PyPI pages for each package name given as the first argument and 
    scrapes out the pip install command for the first matching project, if found.

    PARAMS:
        - pknames (list[str]): name options for a package, e.g. ["flower", "python-flower"]
        - homepage (str): the package home (project) URL to compare against if verify_homepage is True
        - verify_homepage (bool): whether to verify the packgae home (project) URL against the given one
        (defaults to global VERIFY_HOMEPAGE flag)
    RETURNS:
        (str): the pip install command if found (e.g. "pip install flower") or an empty string if not found.
    """
    if not pknames:
        logging.debug(f'{TAB*2}🚫 Empty package list passed!')
        return ''
    # for each supplied package name
    for pk in pknames:
        # normalize name to fit PyPI standards
        npk = pk.lower()
        for k, v in REPLACE_URL.items():
            npk = npk.replace(k, v)
        url = PYPI.format(npk)
        logging.debug(f'{TAB*3} GETTING {pk} -> {npk} from {url} ...')
        if verify_homepage and homepage:
            logging.debug(f'{TAB*3} Homepage verification ON')
        try:
            # download page from PyPI
            res = SESSION.get(url)
            # page may not exist - so raise an exception
            if not res.ok:
                raise Exception(f'HTTP(S) ERROR: Returned code = {res.status_code}')
        except Exception as err:
            logging.debug(f'{TAB*4}🚫 {str(err)}')
            continue
        else:
            # get page text if download was successful
            res = res.text
            # we'll now parse the HTML manually (forget bs4!)
            try:
                # if homepage verification is set, scrape the URL and compare it to given
                if verify_homepage and homepage:
                    i = res.index('<a class="vertical-tabs__tab vertical-tabs__tab--with-icon vertical-tabs__tab--condensed" href="http')
                    i = res.index('href=', i+1)
                    i = res.index('http', i+1)
                    j = res.index('"', i)
                    page = res[i:j]
                    if homepage.lower().strip('/') != page.lower().strip('/'):
                        # homepage verification failed - skip to next package name
                        logging.debug(f'{TAB*4}🔴 Homepage verification failed')
                        continue
                # scrape pip install command
                i = res.index('<span id="pip-command"')
                i = res.index('>', i + 1) + 1
                j = res.index('<', i)
                out = res[i:j]
                logging.debug(f'{TAB*4}🟢 Found Pip command: {out}')
                # return pip install command
                return out
            except ValueError:
                # we'll land here if some tags were not found in the HTML
                # log this error and skip to next package name
                logging.debug(f'{TAB*4}🔴 No Pip command found!')
                continue
    # we'll land here if no package name has returned a pip one-liner
    logging.debug(f'{TAB*2}🔴 No package found on PyPI!')
    # return empty string by default
    return ''

# -----------------------------------------------------------# 

def readme_process_line(index: int, line: str, pkname: str, pkurl: str, pkdesc: str) -> Optional[str]:
    """
    Callback function to process a single package line in README. In this 'naive' implementation, 
    it calls parse_pypi() to scrape the pip command from PyPI and appends it to the 
    original line. 

    PARAMS:
        - index (int): line index number (0-based)
        - line (str): raw package line text, e.g. "* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery."
        - pkname (str): extracted package name, e.g. "flower"
        - pkurl (str): extracted package URL, e.g. "https://github.com/mher/flower"
        - pkdesc (str): extracted package summary, e.g. "Real-time monitor and web admin for Celery."
    RETURNS:
        (str | None): original line with an appended pip install command or None if no pip command could be fetched.
        Example output to the flower package: 
        "* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery. **INSTALL**: `pip install flower`"
        If None is returned, the original line will remain intact.
    """
    logging.info(f'{TAB}🔵 Processing LINE {index:04} :: PK NAME = {pkname} :: PK URL = {pkurl} ◦ ◦ ◦')
    
    # use 'naive' approach: try downloading the package page from PyPI and parsing its content

    # if line already contains pip command, return None
    if '**INSTALL**:' in line:
        logging.info(f'{TAB*2}🟢 Already pypified!')
        return None
    
    # make at least two options for package name to locate on PyPI
    pks = [pkname, f'python-{pkname}', f'{pkname}-python']
    # try scraping the pip one-liner
    pipcmd = parse_pypi(pks, pkurl)
    if pipcmd:
        logging.info(f'{TAB*2}🟢 Success: pip command = "{pipcmd}"')
        # return altered line with appended pip one-liner
        return f'{line} **INSTALL**: `{pipcmd}`'
    # here None is returned
    logging.info(f'{TAB*2}🔴 No package info located')

# -----------------------------------------------------------# 

def main():
    # read README.md to string
    with open(README, 'r', encoding=ENC) as read_me_file:
        read_me = read_me_file.read()

    # split content: header (TOC), body (libraries proper), footer (everything from Resources section to end)
    logging.info('🟠 SPLITTING README FILE ◦ ◦ ◦')
    sp = read_me.split('---')
    header = sp[0] + '---' + NL
    body = sp[-1]
    sp = body.split(RESOURCES)
    body = sp[0].strip()
    footer = NL + RESOURCES + sp[-1]
    logging.info(f'{TAB}🟢 DONE')

    # process body, augmenting each matching line with pip one-line instructions
    logging.info('🟠 PROCESSING PACKAGE ENTRIES ◦ ◦ ◦')
    body = readme_process(body, readme_process_line)
    logging.info(f'{TAB}🟢 DONE')

    # piece everything together
    read_me = header + body + footer

    # write back to README.md
    logging.info('🟠 WRITING TO README ◦ ◦ ◦')
    with open(README, 'w', encoding=ENC) as wfile:
        wfile.write(read_me)
    logging.info(f'{TAB}🟢 DONE')

# -----------------------------------------------------------# 

if __name__ == "__main__":
    try:
        main()
    finally:
        SESSION.close()