Meilisearch is built for the search box in your app, Elasticsearch and OpenSearch for search plus analytics, and each server has its own Python search library.

How to choose:

- A search box in your app or site, typo-tolerant out of the box: meilisearch
- Search plus analytics on an Elasticsearch server: elasticsearch
- Search plus analytics on OpenSearch, including Amazon OpenSearch Service: opensearch-py
- A Django site already built on Haystack: django-haystack
- Similarity search over vectors, inside your own process: faiss-cpu

### Meilisearch

Pick the meilisearch client when your search runs on Meilisearch, an engine built for [instant search aimed at end users](https://www.meilisearch.com/docs/resources/comparisons/alternatives). Its own comparison pages [point you to Elasticsearch](https://www.meilisearch.com/docs/resources/comparisons/elasticsearch) or OpenSearch when you need analytics beyond search, like logs and metrics. Create a `meilisearch.Client` with your server's URL and key, then [call `add_documents()` on an index](https://github.com/meilisearch/meilisearch-python). Its search is typo-tolerant without configuration: "caorl" still finds "Carol".

### Elasticsearch

Pick the elasticsearch package when your server is Elasticsearch, a [distributed search and analytics engine](https://www.elastic.co/elasticsearch). Its core client covers the entire Elasticsearch API, and its [DSL module](https://www.elastic.co/docs/reference/elasticsearch/clients/python) lets you write queries and documents as Python classes instead of dicts. For OpenSearch, use opensearch-py instead.

### OpenSearch

Pick opensearch-py for an OpenSearch cluster, including Amazon OpenSearch Service. OpenSearch is a [search and analytics suite](https://opensearch.org/about/), and opensearch-py is the client to use there, since the elasticsearch package [refuses any server that isn't Elasticsearch](https://github.com/elastic/elasticsearch-py/blob/main/elasticsearch/_sync/client/_base.py). Rather than sending raw HTTP requests, you [create an `OpenSearch` client](https://docs.opensearch.org/latest/clients/python-low-level/) for your cluster and call its methods. Like the elasticsearch package, it ships [a high-level DSL](https://github.com/opensearch-project/opensearch-py/blob/main/guides/dsl.md) for building queries from Python objects.

### Haystack

Keep django-haystack for a Django site already built on it. Haystack gives Django [one search API over pluggable backends](https://django-haystack.readthedocs.io/en/latest/), so you can switch engines without modifying your code. Its tutorial has you [create a `SearchIndex` for each model](https://django-haystack.readthedocs.io/en/latest/tutorial.html) you want to search, with exactly one field marked `document=True` as the primary field to search in.

### Faiss

Pick Faiss for similarity search over vectors you already have, inside your own process. Its authors [describe it as neither a service nor a database](https://arxiv.org/html/2401.08281). It runs as part of your program and [builds its index in RAM](https://github.com/facebookresearch/faiss/wiki). When vectors need to live on a server next to your documents, Elasticsearch, OpenSearch, and Meilisearch search vectors too, and OpenSearch can [run Faiss as its vector engine](https://docs.opensearch.org/latest/mappings/supported-field-types/knn-methods-engines/). Start with [a flat index](https://github.com/facebookresearch/faiss/wiki/Guidelines-to-choose-an-index), the only kind that guarantees exact results.

### Indexing in batches

Send documents to a search server in batches, not one request each. The elasticsearch package's docs call its bulk helpers [the recommended way to perform bulk ingestion](https://www.elastic.co/docs/reference/elasticsearch/clients/python/getting-started). Meilisearch processes [a single large payload faster](https://www.meilisearch.com/docs/getting_started/good_practices) than many small ones.
