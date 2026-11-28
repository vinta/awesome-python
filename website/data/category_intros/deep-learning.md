Make PyTorch your default Python deep learning framework, and add PyTorch Lightning to skip writing the training loop. JAX suits code written as pure functions.

How to choose:

- A new project, learning deep learning, or working with LLMs: PyTorch
- PyTorch without writing the training loop or multi-GPU setup yourself: PyTorch Lightning
- Function transformations, large-scale training, or scientific computing: JAX
- A high-level `fit()` API that runs on JAX, PyTorch, or TensorFlow: Keras
- An existing TensorFlow codebase: TensorFlow
- Reinforcement learning environments behind one standard API: Gymnasium
- Training a standard RL algorithm on a Gymnasium environment: Stable Baselines3

### PyTorch

Pick PyTorch for a new project, to learn deep learning, or to work with LLMs: [Hugging Face Transformers works with PyTorch](https://huggingface.co/docs/transformers/installation). Define your model as [a subclass of `nn.Module`](https://docs.pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html).

### PyTorch Lightning

Pick PyTorch Lightning when you want PyTorch without writing the training loop, checkpointing, and multi-GPU code yourself. It [organizes PyTorch code to remove boilerplate](https://lightning.ai/docs/pytorch/stable/home/introduction), and [your model's architecture stays as it is](https://lightning.ai/docs/pytorch/stable/reference/starter/converting). Put the training step in a `LightningModule`, and Lightning's Trainer runs it in [a standardized epoch-based training loop](https://lightning.ai/docs/fabric/stable/).

### JAX

Pick JAX over PyTorch when your work fits pure functions that you differentiate, compile, and vectorize, as in training at scale or scientific computing. It's [designed for high-performance numerical computing and large-scale machine learning](https://docs.jax.dev/en/latest/), with [a NumPy-like interface that runs on CPU, GPU, or TPU](https://docs.jax.dev/en/latest/notebooks/thinking_in_jax.html). `jax.jit` and JAX's other transformations [work only on functionally pure Python functions](https://docs.jax.dev/en/latest/notebooks/Common_Gotchas_in_JAX.html), so JAX is a harder first framework than PyTorch. The core has [very little specific to deep learning](https://docs.jaxstack.ai/en/latest/), so build networks with Flax.

### Keras

Pick Keras for a high-level API that trains with `fit()`, or to keep code already written in Keras. It [runs on top of JAX, TensorFlow, or PyTorch](https://keras.io/getting_started/about/), and you [install that backend framework alongside it](https://keras.io/getting_started/). A Keras model can also be used as a PyTorch module or exported as a TensorFlow SavedModel.

### TensorFlow

Keep TensorFlow for code already built on it. Even there, its own guide says [every TensorFlow user should use the Keras APIs by default](https://www.tensorflow.org/guide/keras), through `tf.keras`.

### Gymnasium

Pick Gymnasium for the environments your agent learns in. It's [an API standard for reinforcement learning with a diverse collection of reference environments](https://gymnasium.farama.org/), and a fork of OpenAI's Gym. Create an environment with [`make()`](https://gymnasium.farama.org/introduction/basic_usage/).

### Stable Baselines3

Pick Stable Baselines3 to train a standard RL algorithm on a Gymnasium environment without writing it yourself. It's [a set of reliable implementations of reinforcement learning algorithms in PyTorch](https://stable-baselines3.readthedocs.io/en/master/), and its algorithms share [a sklearn-like syntax](https://stable-baselines3.readthedocs.io/en/master/guide/quickstart.html): create a model with your environment and call `learn()`.

### Choosing by ecosystem

Pick a framework for its ecosystem and the way you like to work, not for benchmark charts, whose winners change with setup details like data loading.
