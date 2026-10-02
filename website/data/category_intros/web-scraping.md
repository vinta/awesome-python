Most crawls you build with a Python web scraping library fit Scrapy: you write selectors, it schedules requests. Crawl4AI hands pages to an LLM as Markdown.

How to choose:

- Crawling a site with selectors you write: Scrapy
- Pages an LLM will read, as Markdown: Crawl4AI
- A goal in plain words that an LLM carries out in a browser: Browser Use
- A browser script with plain-word steps where selectors would break: Stagehand
- A browser agent where TypeSafe's Jev picks each action: jev-ultrafast
- A whole HTML page or fragment as Markdown: markdownify
- RSS, Atom, and JSON feeds: feedparser
- An article's main text, without menus and ads: Trafilatura

Scrapy is [an application framework for crawling web sites and extracting structured data](https://docs.scrapy.org/en/latest/intro/overview.html). It schedules and processes requests asynchronously, so one slow page doesn't hold up the crawl. Start with [`scrapy startproject`](https://docs.scrapy.org/en/latest/intro/tutorial.html#creating-a-project), write a spider class whose callbacks yield items, and send those items through [item pipelines](https://docs.scrapy.org/en/latest/topics/item-pipeline.html) that clean, validate, deduplicate, or store them.

Crawl4AI [turns any website into clean, LLM-ready Markdown](https://docs.crawl4ai.com/) for RAG, AI agents, and data pipelines. Its `AsyncWebCrawler` [launches a headless browser](https://docs.crawl4ai.com/core/quickstart/) and converts each page's HTML to Markdown. Give `arun()` one URL, or give [`arun_many()`](https://docs.crawl4ai.com/advanced/multi-url-crawling/) a list, which it crawls with concurrency control.

Browser Use [runs its agent locally from Python](https://github.com/browser-use/browser-use#user-content-path-3-python-library), with your choice of model and a local or cloud browser. Create an `Agent` with a task and an LLM, then `await agent.run()`.

Stagehand lets you [mix AI steps with deterministic browser control](https://docs.stagehand.dev/v4/first-steps/introduction) in one script and decide how much AI each step uses. Call `page` methods like `goto` and `click` when you know the selector, and the self-healing `act()`, `extract()`, and `observe()` where a selector would break when the site changes.

jev-ultrafast [takes one goal](https://github.com/browser-use/jev-ultrafast): TypeSafe's Jev picks an operation and a page element, and a small LLM writes text only when the operation is typing. Its default loop reads structured page state, not screenshots. Running it takes a [TypeSafe API key](https://github.com/browser-use/jev-ultrafast#user-content-try-it) along with the text model's.

markdownify [converts HTML to Markdown](https://github.com/matthewwithanm/python-markdownify#user-content-usage): call `markdownify()` on an HTML string. It converts all the HTML you give it, so for an article's main text, use Trafilatura.

feedparser has [one main function, `parse()`](https://feedparser.readthedocs.io/en/latest/introduction/), which takes a URL, a local file, or a string and reads RSS, Atom, and JSON feeds. When you poll a feed, [pass its last ETag and Last-Modified values back](https://feedparser.readthedocs.io/en/latest/http-etag/): without them you download unchanged feeds again, and the publisher may ban you.

Trafilatura [returns a page's main text](https://trafilatura.readthedocs.io/en/latest/faq.html#how-does-trafilatura-compare-to-beautifulsoup-or-scrapy) without the navigation, ads, and boilerplate, with no selectors to write. Its FAQ pairs it with Scrapy: Scrapy crawls, Trafilatura extracts. [`extract()` is the default choice](https://trafilatura.readthedocs.io/en/latest/faq.html#which-extraction-function-should-i-use) among its functions.

Let sites know who's crawling. Scrapy's tutorial says to [set `USER_AGENT`](https://docs.scrapy.org/en/latest/intro/tutorial.html#creating-a-project) to a project name plus a URL or an email address, so site owners can ask you to adjust your crawler instead of blocking it. feedparser's docs also say to [set the User-Agent](https://feedparser.readthedocs.io/en/latest/http-useragent/) to your application's name and URL.

With a browser agent, keep passwords away from the model: Browser Use [shows the LLM only placeholders](https://docs.browser-use.com/open-source/examples/templates/sensitive-data), and Stagehand [fills in variables after the model picks the action](https://docs.stagehand.dev/v4/best-practices/prompting-best-practices#protect-sensitive-data). Then check the agent's work: Browser Use's docs say to [verify important outcomes against the destination system](https://docs.browser-use.com/open-source/customize/agent/output-format), and jev-ultrafast's README says a `DONE` [still needs independent verification](https://github.com/browser-use/jev-ultrafast#user-content-evidence-and-limits).
