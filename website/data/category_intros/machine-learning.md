Fit models with scikit-learn, which covers a Python machine learning library's basic tasks, boosted trees included. Deep learning takes a framework of its own.

How to choose:

- Classification, regression, and clustering on tabular data: scikit-learn
- Boosted trees with no extra dependency: scikit-learn
- Causal graphs and Bayesian networks: pgmpy
- Feature engineering that keeps your DataFrame's column names: Feature-engine
- Boosted trees trained across a cluster: XGBoost
- Boosted trees on large data, fast and light on memory: LightGBM
- Tables full of category columns, with little tuning: CatBoost
- Series with strong seasonality and holiday effects: Prophet
- Many series on classical models like ARIMA and ETS: StatsForecast
- Forecasting next to classification and other time-series tasks: sktime
- Forecasts with no model to train: TimesFM

scikit-learn does [supervised and unsupervised learning](https://scikit-learn.org/stable/getting_started.html), plus the tools around it: preprocessing, model selection, and evaluation. Every estimator learns with `fit`. Put your preprocessing and model in one Pipeline, and run cross-validation and searches on that, since the pipeline [keeps test data out of training](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage). You may not need a separate boosting library: its histogram-based gradient boosting is [inspired by LightGBM](https://scikit-learn.org/stable/modules/ensemble.html) and supports missing values and categorical data natively. Deep learning is another matter: it [doesn't fit scikit-learn's design constraints](https://scikit-learn.org/stable/faq.html#why-is-there-no-support-for-deep-or-reinforcement-learning-will-there-be-such-support-in-the-future), so it's out of scope.

pgmpy does [causal and probabilistic reasoning with graphical models](https://pgmpy.org/). Its [quickstart](https://pgmpy.org/started/quickstart.html) follows the tasks: learn a graph's structure from data, fit the distributions for a graph you know, then query the model for probabilities or causal effects.

Feature-engine is [designed to work with dataframes](https://feature-engine.trainindata.com/en/latest/): a DataFrame goes in, and the same DataFrame comes out, with no column order or name changes. Instead of wrapping transformers in a ColumnTransformer, you tell each one which variables to transform. Its transformers [work just like any scikit-learn transformer](https://feature-engine.trainindata.com/en/latest/quickstart/index.html), so they fit in a Pipeline.

XGBoost is [an optimized distributed gradient boosting library](https://xgboost.readthedocs.io/en/stable/). Its Python package has [a native interface, a scikit-learn interface, and a Dask interface](https://xgboost.readthedocs.io/en/stable/python/python_intro.html).

LightGBM is designed for [faster training, lower memory use, and large-scale data](https://lightgbm.readthedocs.io/en/latest/). Pass category columns as they are: LightGBM [uses them directly, with no one-hot encoding](https://lightgbm.readthedocs.io/en/latest/Python-Intro.html).

CatBoost aims for [great results with default parameters](https://catboost.ai/), and it takes non-numeric features without you turning them into numbers. Name the category columns in `cat_features`, and [don't one-hot encode them](https://catboost.ai/docs/en/features/categorical-features), which hurts both training speed and quality.

Prophet fits an additive model of the trend, yearly, weekly, and daily seasonality, and holiday effects. It [works best with series that have strong seasonal effects](https://facebook.github.io/prophet/) and several seasons of history. It [follows the scikit-learn model API](https://facebook.github.io/prophet/docs/quick_start.html): pass `fit` a DataFrame with `ds` and `y` columns, then call `predict`.

StatsForecast offers [widely used univariate models](https://github.com/Nixtla/statsforecast), like automatic ARIMA, ETS, and Theta, optimized for speed, plus benchmark models for baselines. Data goes in as a long-format DataFrame with `unique_id`, `ds`, and `y` columns, and for many series the docs [recommend the `forecast` method](https://nixtlaverse.nixtla.io/statsforecast/docs/getting-started/getting_started_short.html).

sktime gives forecasting, classification, clustering, and anomaly detection [one unified interface](https://github.com/sktime/sktime), with interfaces to scikit-learn and Prophet. Split the series with `temporal_train_test_split`, set a `ForecastingHorizon`, then `fit` and `predict`, as in [Get Started](https://www.sktime.net/docs/get-started/). Through [reduction](https://www.sktime.net/docs/user-guide/introduction/), a scikit-learn regressor can solve a forecasting task.

TimesFM is [a pretrained foundation model from Google Research](https://github.com/google-research/timesfm) for time-series forecasting. It forecasts [zero-shot](https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/), with no training on your data: load a checkpoint and call `predict` with a horizon. Check the license of the weights you download: some are [for non-commercial, non-production use only](https://github.com/google-research/timesfm#license-notice-for-pretrained-weights).

To evaluate a model on time-series data, test it on observations from after its training data. scikit-learn's [TimeSeriesSplit](https://scikit-learn.org/stable/modules/cross_validation.html#time-series-split) does that in cross-validation. For more, see [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python).
