Use scikit-learn as your Python machine learning library for tabular data. For boosted trees, LightGBM trains fastest and CatBoost suits categorical columns.

How to choose:

- Classification, regression, or clustering on tabular data: scikit-learn
- Boosted trees on large data, with time to tune: LightGBM
- Many categorical columns, some with many distinct values: CatBoost
- One class much rarer than the others: imbalanced-learn
- Imputing, encoding, or transforming chosen DataFrame columns: feature-engine
- Boosted trees when speed and categories don't decide it: XGBoost
- A seasonal business series an analyst tunes: Prophet
- Fast statistical models across many series: statsforecast
- One scikit-learn-style interface over many forecasters: sktime
- A forecast baseline with no training on your data: TimesFM
- Tuning hyperparameters: Optuna
- Tracking runs, parameters, and models: MLflow

### scikit-learn

Start with scikit-learn for classification, regression, and clustering on tabular data. It's [an open source machine learning library that supports supervised and unsupervised learning](https://scikit-learn.org/stable/getting_started.html), with preprocessing, model selection, and evaluation in the same package. Every model is an estimator, and each estimator learns from your data through its `fit` method. Deep learning needs a framework of its own, since [scikit-learn keeps it out of scope](https://scikit-learn.org/stable/faq.html#why-is-there-no-support-for-deep-or-reinforcement-learning-will-there-be-such-support-in-the-future).

### imbalanced-learn

Add imbalanced-learn when one class is much rarer than the others. It builds on scikit-learn and [handles classification with imbalanced classes](https://imbalanced-learn.org/stable/) by under- or over-sampling your data. Each sampler [implements a `fit_resample` method](https://imbalanced-learn.org/stable/introduction.html) that returns the resampled data and targets.

### Feature-engine

Add Feature-engine when [pandas and scikit-learn are your main tools](https://feature-engine.trainindata.com/en/latest/) and you want ready-made feature engineering steps, like imputation, categorical encoding, and discretization. scikit-learn's list of related projects says it [applies preprocessing steps to selected groups of variables](https://scikit-learn.org/stable/related_projects.html) and works inside a scikit-learn Pipeline. Its [quick start](https://feature-engine.trainindata.com/en/latest/quickstart/index.html) begins with a `MeanMedianImputer` that fills in missing values.

### LightGBM

Pick LightGBM for large datasets where training time matters and you can afford to tune it. Independent comparisons find it trains faster than XGBoost and CatBoost, and agree that it needs careful tuning to do its best. Its trees grow leaf-wise, which [may cause over-fitting when the data is small](https://lightgbm.readthedocs.io/en/latest/Features.html). The [Python quick start](https://lightgbm.readthedocs.io/en/latest/Python-Intro.html) trains a model with `lgb.train()`.

### CatBoost

Pick CatBoost when your table has many categorical columns, especially ones with many distinct values: independent comparisons favor it for that data. Hand it the raw categories, since its docs warn that [one-hot encoding during preprocessing](https://catboost.ai/docs/en/features/categorical-features) hurts both training speed and quality. Start from `CatBoostClassifier` in [its quick start](https://catboost.ai/docs/en/concepts/python-quickstart).

### XGBoost

Pick XGBoost for boosted trees when neither training speed nor categorical columns decide it. It's [designed to be highly efficient, flexible and portable](https://xgboost.readthedocs.io/en/stable/), and the same code runs on distributed environments like Hadoop and MPI. Its [scikit-learn interface](https://xgboost.readthedocs.io/en/stable/python/sklearn_estimator.html) gives you `XGBClassifier`, which works with most of scikit-learn's utilities, like cross-validation.

### Prophet

Pick Prophet for a business series with strong seasonality, where an analyst tunes the forecast. It [works best with time series that have strong seasonal effects and several seasons of historical data](https://meta.github.io/prophet/). Its parameters are human-interpretable, so domain knowledge goes straight into the forecast. Fit the `Prophet` class to [a dataframe of dates and values](https://meta.github.io/prophet/docs/quick_start.html).

### StatsForecast

Pick StatsForecast to forecast many series at once with statistical models like AutoARIMA, AutoETS, and Theta. It [can efficiently fit millions of time series](https://nixtlaverse.nixtla.io/statsforecast/). Put every series in one long data frame, with a column naming the series, and [call the `forecast` method](https://nixtlaverse.nixtla.io/statsforecast/docs/getting-started/getting_started_short.html), which its docs recommend for many series.

### sktime

Pick sktime to compare forecasters behind one scikit-learn-style interface, or for time series classification and other tasks beyond forecasting. Its forecasting API [wraps Prophet, StatsForecast's models, and TimesFM](https://www.sktime.net/docs/api-reference/forecasting/) alongside its own, so they all fit and predict the same way. In [its quick start](https://www.sktime.net/docs/get-started/), a forecaster fits on past values and predicts over a `ForecastingHorizon`.

### TimesFM

Try TimesFM for a quick forecast baseline before you train a model of your own. It's [a pretrained time-series foundation model](https://github.com/google-research/timesfm) from Google Research, so it forecasts a series zero-shot, without training on it first. Check [the license of its pretrained weights](https://github.com/google-research/timesfm#license-notice-for-pretrained-weights) before commercial use.

### Optuna

Pick Optuna to tune hyperparameters. XGBoost's tuning guide calls it [another great option](https://xgboost.readthedocs.io/en/stable/tutorials/param_tuning.html), and MLflow's [hyperparameter tuning tutorial](https://mlflow.org/docs/latest/ml/getting-started/hyperparameter-tuning/) runs on it. You write the search space in plain Python, [with conditionals and loops](https://optuna.readthedocs.io/en/stable/), and Optuna prunes unpromising trials early. Each search is a study you create with `optuna.create_study()`.

### MLflow

Use MLflow to record each training run's parameters, metrics, and model. Its docs for [traditional machine learning](https://mlflow.org/docs/latest/ml/traditional-ml/) cover everything from scikit-learn pipelines to gradient boosting models. Call [`mlflow.autolog()`](https://mlflow.org/docs/latest/ml/tracking/autolog/) before your training code, and scikit-learn, XGBoost, and LightGBM runs get logged without explicit log statements.

### Keeping test data out of training

Fit preprocessing and resampling inside a pipeline, so cross-validation never learns from the test rows. scikit-learn calls its pipeline [a great way to prevent data leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage). imbalanced-learn warns against resampling the whole dataset before the split, and [resamples inside its own pipeline](https://imbalanced-learn.org/stable/common_pitfalls.html#data-leakage) instead.

### More machine learning libraries

For more Python machine learning libraries, see [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python).
