PyTorch suits new models, since it debugs like plain Python. Gymnasium environments pass arrays to whichever Python deep learning framework trains your agent.

How to choose:

- Building and training neural networks: PyTorch
- RL environments, built-in or your own: Gymnasium
- A standard training loop scaled across GPUs: PyTorch Lightning
- NumPy-style code compiled for GPUs and TPUs: JAX
- One model API across JAX, TensorFlow, and PyTorch: Keras
- An existing TensorFlow codebase: TensorFlow
- Ready-made RL algorithms to train an agent: Stable Baselines3

PyTorch runs each line of code as it's reached, so [a debugger and stack traces read the way you'd expect](https://github.com/pytorch/pytorch#imperative-experiences). Its [quickstart](https://docs.pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html) shows the pieces of a project: a `Dataset` holds your samples and labels, and a `DataLoader` wraps it in an iterable. A model subclasses `nn.Module`, defines its layers in `__init__`, and passes data through them in `forward`. To keep a trained model, [save its `state_dict`](https://docs.pytorch.org/tutorials/beginner/saving_loading_models.html) rather than pickling the whole model, which ties the file to your exact classes and directory layout.

PyTorch Lightning [organizes PyTorch code](https://github.com/Lightning-AI/pytorch-lightning#why-pytorch-lightning) so you write the model logic and it handles the engineering. A `LightningModule` is still an `nn.Module`, with your training step and `configure_optimizers` added, and the `Trainer` runs the loop around it. Moving to more GPUs, to TPUs, or to 16-bit precision is [a Trainer argument](https://github.com/Lightning-AI/pytorch-lightning#advanced-features), with no change to your model code.

JAX pairs a NumPy-like API with [composable transformations](https://github.com/jax-ml/jax#transformations): `jax.grad` takes gradients, `jax.jit` compiles, and `jax.vmap` vectorizes. They're designed for [functionally pure functions](https://docs.jax.dev/en/latest/notebooks/Common_Gotchas_in_JAX.html#pure-functions), so pass every input as an argument and return every result. The core holds little that's specific to deep learning. [For neural networks](https://docs.jaxstack.ai/en/latest/), add the JAX AI Stack: Flax for models, Optax for optimizers, and Orbax for checkpoints.

Gymnasium, a fork of OpenAI's Gym, is [a standard API for reinforcement learning](https://github.com/Farama-Foundation/Gymnasium): one interface between learning algorithms and environments, plus reference environments that follow it. Its [basic loop](https://gymnasium.farama.org/introduction/basic_usage/) comes down to `make()`, `Env.reset()`, `Env.step()`, and `Env.render()`, and wrappers change an environment without touching its code. For your own problem, [subclass `gymnasium.Env`](https://gymnasium.farama.org/introduction/create_custom_env/) with observation and action spaces, and register it so `gymnasium.make()` builds it like a built-in one.

Stable Baselines3 is a set of [reliable implementations of RL algorithms in PyTorch](https://github.com/DLR-RM/stable-baselines3), and it assumes you already know some RL. It follows [a scikit-learn-like syntax](https://stable-baselines3.readthedocs.io/en/master/guide/quickstart.html): create a model such as `A2C("MlpPolicy", env)`, call `learn()`, then `predict()`. It trains on any environment that [follows the Gymnasium interface](https://stable-baselines3.readthedocs.io/en/master/guide/custom_env.html). Its [RL tips](https://stable-baselines3.readthedocs.io/en/master/guide/rl_tips.html) pick the algorithm by action space, since DQN handles only discrete actions and SAC only continuous ones.

For more frameworks, papers, and courses, see [awesome-deep-learning](https://github.com/ChristosChristofidis/awesome-deep-learning).
