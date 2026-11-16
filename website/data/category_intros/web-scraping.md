Crawl a site and extract structured data with Scrapy. Crawl4AI turns pages into Markdown for an LLM, and browser-use lets an AI agent do a task in a browser.

How to choose:

- Crawling a site for structured data: Scrapy
- Pages turned into Markdown for an LLM or RAG pipeline: Crawl4AI
- A goal an AI agent works out in a real browser: browser-use
- A scripted browser flow with AI for the steps that break: Stagehand
- Selectors that still find elements after a redesign: Scrapling
- HTML you already have, converted to Markdown: markdownify
- RSS, Atom, and JSON feeds: feedparser
- An article's main text and metadata: Trafilatura

### Scrapy

Pick Scrapy when the crawl itself is the job: following links across many pages and exporting the items you extract from each. Start with `scrapy startproject`, then write a spider. When a page fills in its content with JavaScript, Scrapy's docs say to [find the data source](https://docs.scrapy.org/en/latest/topics/dynamic-content.html#finding-the-data-source) and request it directly. When you can't, [fall back to a headless browser through scrapy-playwright](https://docs.scrapy.org/en/latest/topics/dynamic-content.html#using-a-headless-browser).

### Crawl4AI

Pick Crawl4AI when the pages you crawl go into an LLM or a RAG pipeline: it [turns any website into clean, LLM-ready Markdown](https://docs.crawl4ai.com/). `AsyncWebCrawler` loads each page in a headless browser, and `arun()` returns it as Markdown. For repeated, structured data, its docs say to [try a schema or regex before an LLM](https://docs.crawl4ai.com/extraction/no-llm-strategies/), which is faster and cheaper.

### browser-use

Pick browser-use when you know the goal but not the steps: you give it a task, and [the agent completes it in a real browser](https://docs.browser-use.com/open-source/introduction). If you can script most of the flow yourself, Stagehand fits better. Start with `Agent('<task>').run_sync()`. [The task is the agent's only instruction](https://docs.browser-use.com/open-source/agent#writing-tasks), so say where to start and what done looks like. Keep passwords out of the task text, and [pass them as secrets the agent types without seeing](https://docs.browser-use.com/open-source/secrets).

### Stagehand

Pick Stagehand when you can script a browser flow and want AI only for the steps that break when a page changes. [One script mixes AI calls like `act()` and `extract()` with plain page calls](https://docs.stagehand.dev/first-steps/introduction). Its docs recommend [one instruction per action](https://docs.stagehand.dev/best-practices/prompting-best-practices#break-work-into-steps), so you can debug and cache each step by itself. [Pass passwords as variables](https://docs.stagehand.dev/best-practices/prompting-best-practices#protect-sensitive-data), so the model sees only their names.

### Scrapling

Pick Scrapling when your selectors keep breaking as a site changes. Turn on its [adaptive feature](https://scrapling.readthedocs.io/en/latest/parsing/adaptive.html), and Scrapling remembers the properties of an element you tell it to save. After a redesign, it finds the most similar element, without AI. It also ships fast HTTP requests, stealth browsers, and concurrent crawling in one library. Start with `Fetcher.get()`. On an existing Scrapy project, [Scrapy keeps handling the crawling while Scrapling handles the parsing](https://scrapling.readthedocs.io/en/latest/integrations/scrapy.html).

### markdownify

Pick markdownify when you already have the HTML and want to decide how each tag becomes Markdown. `md(html)` converts it. To change one tag's output, [subclass `MarkdownConverter` and override its `convert_<tag>` method](https://github.com/matthewwithanm/python-markdownify#creating-custom-converters).

### feedparser

Pick feedparser to read RSS, Atom, and JSON feeds: its one main function, `feedparser.parse()`, takes a URL, a file, or a string. It sanitizes the HTML inside feeds, but [content marked as plain text isn't sanitized](https://feedparser.readthedocs.io/en/latest/html-sanitization/), so check each entry's content type and escape plain text before you render it.

### Trafilatura

Pick Trafilatura to pull an article's main text and metadata from pages you don't control: it [focuses on the actual content](https://trafilatura.readthedocs.io/en/latest/) and drops headers, footers, and boilerplate. Pass the page from `fetch_url()` to `extract()`.

### Crawling politely

Where a site allows crawling, [set a User-Agent that names you and lets the site's owners reach you](https://docs.scrapy.org/en/latest/topics/practices.html#avoiding-getting-banned), so they can ask you to slow down instead of blocking you. Read each site's robots.txt, drop the URLs it disallows, and [respect its crawl delay](https://trafilatura.readthedocs.io/en/latest/downloads.html).
