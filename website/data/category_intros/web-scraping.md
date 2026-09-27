To crawl a whole site, use Scrapy as your Python web scraping library; to feed pages to an LLM, Crawl4AI; to pull an article's main text, Trafilatura.

How to choose:

- Crawling a whole site, or many sites: Scrapy
- Web pages as clean Markdown for an LLM: Crawl4AI
- An article's main text and metadata: Trafilatura
- An AI agent that does a task in the browser for you: Browser Use
- Browser automation in your own code, with plain-language steps: Stagehand
- A browser agent that picks each action from a table of page elements: jev-ultrafast
- RSS, Atom, and JSON feeds: feedparser
- A whole HTML page as Markdown text: html2text

Scrapy is a framework [for crawling websites and extracting structured data](https://docs.scrapy.org/en/latest/intro/overview.html) from them, and it sends requests asynchronously. Create a project with `scrapy startproject` and [write your spiders in it](https://docs.scrapy.org/en/latest/intro/tutorial.html). When a page loads its data with JavaScript, [find the request that returns the data](https://docs.scrapy.org/en/latest/topics/dynamic-content.html) and send it yourself. Use a headless browser only when that fails. To run your spiders in production, deploy them to [Scrapyd or Zyte Scrapy Cloud](https://docs.scrapy.org/en/latest/topics/deploy.html).

Crawl4AI [turns websites into clean, LLM-ready Markdown](https://docs.crawl4ai.com/). It runs Chromium headless by default, so run `crawl4ai-setup` once to install the browser. Open an `AsyncWebCrawler` in an `async with` block and [call `arun()` for each URL](https://docs.crawl4ai.com/core/quickstart/). When pages share one layout, extract the data with CSS or XPath schemas: they [do exactly what you specify](https://docs.crawl4ai.com/extraction/no-llm-strategies/), while an LLM's output can vary. Keep [LLM extraction](https://docs.crawl4ai.com/extraction/llm-strategies/), which is slower and costlier, for content an AI has to interpret.

Trafilatura [extracts a page's main text and metadata](https://trafilatura.readthedocs.io/en/latest/) and skips boilerplate like headers and footers. Call `extract()`, and pass `favor_precision=True` or `favor_recall=True` to [tune what it keeps](https://trafilatura.readthedocs.io/en/latest/usage-python.html). It works on raw HTML, so [render JavaScript pages first](https://trafilatura.readthedocs.io/en/latest/troubleshooting.html) with a browser and pass the result to `extract()`. It pairs with Scrapy: [Scrapy crawls, Trafilatura extracts](https://trafilatura.readthedocs.io/en/latest/faq.html#how-does-trafilatura-compare-to-beautifulsoup-or-scrapy).

Browser Use is an AI browser agent: you [give it a task and an LLM](https://docs.browser-use.com/open-source/quickstart), and it runs the task in a browser. Its docs say to [be specific about the actions](https://docs.browser-use.com/open-source/customize/agent/prompting-guide) you want. Pass a Pydantic model as `output_model_schema` to get structured results. Don't take the agent's word for it: `is_successful()` is [only its own assessment](https://docs.browser-use.com/open-source/customize/agent/output-format), so check important results yourself, like whether a form really got submitted. Pass logins as `sensitive_data`, so the model [sees only placeholders](https://docs.browser-use.com/open-source/examples/templates/sensitive-data) in the text it reads. Set `use_vision=False` too, or the real values can leak through screenshots.

Stagehand leaves the steps to your code: you [mix plain-language actions with regular page calls](https://docs.stagehand.dev/first-steps/introduction) in one script, and decide how much AI each step uses. Give each `act()` call [one focused action](https://docs.stagehand.dev/best-practices/prompting-best-practices), and pass credentials as variables, so their values never reach the model. To get data out, pass `extract()` a Pydantic model, and Stagehand [validates the result against it](https://docs.stagehand.dev/basics/extract).

feedparser parses RSS, Atom, and JSON feeds with [one function, `parse()`](https://feedparser.readthedocs.io/en/latest/introduction/), which takes a URL, a file, or a string. When you poll a feed, send back the [ETag and Last-Modified values](https://feedparser.readthedocs.io/en/latest/http-etag/) from the last response. Otherwise you download unchanged feeds again, and the publisher may ban you. Content feedparser marks as `text/plain` [hasn't been sanitized](https://feedparser.readthedocs.io/en/latest/html-sanitization/), so escape it before you render it.

html2text [converts a page of HTML into Markdown](https://github.com/Alir3z4/html2text), with options such as [`ignore_links`](https://github.com/Alir3z4/html2text/blob/master/docs/usage.md). It's GPL, while Trafilatura is [Apache](https://trafilatura.readthedocs.io/en/latest/).

Whatever you pick, tell sites who you are and go easy on them. Scrapy's docs say to [set `USER_AGENT` to a value that identifies you](https://docs.scrapy.org/en/latest/topics/practices.html#avoiding-getting-banned) and space out your requests. The feedparser docs say to [set the User-Agent to your app's name and URL](https://feedparser.readthedocs.io/en/latest/http-useragent/), and Trafilatura's to [throttle per domain and follow robots.txt](https://trafilatura.readthedocs.io/en/latest/downloads.html).
