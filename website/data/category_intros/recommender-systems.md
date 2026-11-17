Match the Python recommender system library to your data: Surprise if users rate items, implicit if they only buy or watch. Annoy finds similar items fast.

How to choose:

- Ratings users give, like 1 to 5 stars: Surprise
- Purchases, watches, or page views, with no ratings: implicit
- Fast lookups of similar items from a trained model: Annoy

Surprise is built for [explicit rating data](https://surpriselib.com/), and it doesn't support implicit ratings. Its [basic usage](https://surprise.readthedocs.io/en/latest/getting_started.html#basic-usage) cross-validates an algorithm like SVD on a built-in dataset in a few lines of code. For your own ratings, define a `Reader` and [load them from a file or a pandas dataframe](https://surprise.readthedocs.io/en/latest/getting_started.html#use-a-custom-dataset). Surprise predicts ratings, so to recommend items, [predict the ratings a user hasn't given and keep the top N](https://surprise.readthedocs.io/en/latest/FAQ.html#how-to-get-the-top-n-recommendations-for-each-user).

implicit offers fast Python implementations of popular algorithms for [implicit feedback datasets](https://benfred.github.io/implicit/), such as Alternating Least Squares and Bayesian Personalized Ranking. Every model [implements one interface](https://benfred.github.io/implicit/api/models/index.html) for training and recommending. Train with `fit` on a [sparse CSR matrix of users by items](https://benfred.github.io/implicit/api/models/recommender_base.html#implicit.recommender_base.RecommenderBase.fit), whose values are how confident you are that the user likes each item. Then `recommend` returns items for a user, and `similar_items` finds related items.

Annoy is a C++ library with Python bindings that [searches for points close to a query point](https://github.com/spotify/annoy). For recommendations, it runs [after matrix factorization](https://github.com/spotify/annoy#background): every user and item becomes a vector, and Annoy finds similar ones. Its indexes are static files, so you build an index once and save it, and every process [loads it with mmap](https://github.com/spotify/annoy#python-code-example) and shares the same data.

implicit and Annoy work together: implicit can use an Annoy index to [speed up `recommend` and `similar_items`](https://benfred.github.io/implicit/api/ann.html) on any matrix factorization model, at the risk of missing some relevant results.
