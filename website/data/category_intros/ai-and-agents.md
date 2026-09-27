LangChain is the place to start among Python libraries for AI agents, and LangGraph gives you control of every step. vLLM serves your own models.

How to choose:

- Skills for your coding agent: Django AI Skills, Sentry Skills, or Trail of Bits Skills
- A first agent: LangChain, or LangGraph to control every step
- An agent built on one vendor's platform: OpenAI Agents SDK or Claude Agent SDK
- A ready-made personal assistant: Hermes Agent, or AstrBot for chat apps
- Prompts tuned against a metric instead of by hand: DSPy
- Structured output, RAG, or agent memory: Instructor, LlamaIndex, or Mem0
- Running pre-trained models: Transformers
- Serving a model: vLLM, or MLX LM on Apple silicon
- One API for many LLM providers: LiteLLM
- Image and video generation: Diffusers
- Fine-tuning: PEFT, Unsloth, or Axolotl
- Speech: Whisper for speech to text, Kitten TTS for text to speech

New to agents? LangGraph's own docs [recommend LangChain's prebuilt agents](https://docs.langchain.com/oss/python/langgraph/overview), which run on LangGraph: give an agent a model, tools, and a prompt, and the loop is handled for you. Drop down to LangGraph for [needs that combine deterministic and agentic workflows](https://docs.langchain.com/oss/python/langchain/overview). You don't need LangChain to use LangGraph.

Pydantic AI is the pick when you want your type checker to cover the agent too. Give the agent an output type, and [every run comes back as a validated Pydantic model](https://pydantic.dev/docs/ai/overview/); when validation fails, the model is asked to try again. Tools and instructions get their dependencies through typed injection, so you can swap in a test double in unit tests.

CrewAI splits the work into Crews, teams of role-playing agents, and Flows, event-driven workflows that hold state. For production apps, its docs recommend [starting with a Flow](https://docs.crewai.com/en/concepts/production-architecture) and calling Crews from it.

OpenAI Agents SDK keeps [the primitives few](https://openai.github.io/openai-agents-python/): agents, handoffs, and guardrails, with tracing built in. It also runs [non-OpenAI models](https://openai.github.io/openai-agents-python/models/). Claude Agent SDK runs [Claude Code as a library](https://code.claude.com/docs/en/agent-sdk/overview): the same built-in tools, permissions, sessions, and hooks, inside your own process.

Instructor gets validated data out of an LLM into a Pydantic model, with retries when validation fails. Its own docs draw the line: [Instructor for extraction, Pydantic AI for agents](https://python.useinstructor.com/).

DSPy has you [write signatures, not prompts](https://dspy.ai/). Give it examples and a metric, and its optimizers tune the prompts for you.

LlamaIndex is a [data framework](https://github.com/run-llama/llama_index) for LLM apps: it loads, indexes, and queries your documents. Install `llama-index` to start, or `llama-index-core` plus only the integrations you need.

Mem0 adds [memory that persists across sessions](https://docs.mem0.ai/). Self-host the open-source version, or use the managed platform. OpenViking is [AGPL-licensed](https://github.com/volcengine/OpenViking/blob/main/LICENSE), where Mem0 is Apache-licensed.

Transformers runs pre-trained models from the Hugging Face Hub. Start with [`pipeline()`](https://huggingface.co/docs/transformers/pipeline_tutorial): pick a task and a model, and it handles preprocessing and output. Diffusers works the same way for [diffusion models](https://huggingface.co/docs/diffusers/index).

vLLM serves a model behind an [OpenAI-compatible API](https://docs.vllm.ai/en/latest/getting_started/quickstart.html). SGLang does too, and its [RadixAttention caches shared prefixes](https://docs.sglang.io/), which helps when requests share a long prompt. On Apple silicon, [MLX LM](https://github.com/ml-explore/mlx-lm) runs and fine-tunes models locally.

LiteLLM puts many LLM providers behind one OpenAI-style API. Use [the Python SDK in your code, or run the proxy as a gateway](https://docs.litellm.ai/docs/) when a platform team needs keys, budgets, and spend tracking across projects.

PEFT [trains a small set of extra parameters](https://huggingface.co/docs/peft/index) instead of the whole model, and works with Transformers and Diffusers. Unsloth's docs [recommend starting with QLoRA](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide). Axolotl drives [the whole pipeline from one YAML file](https://docs.axolotl.ai/): preprocessing, training, evaluation, quantization, and inference.

Whisper is a [general-purpose speech recognition model](https://github.com/openai/whisper) that also translates speech and identifies languages. Microsoft marks VibeVoice for [research and development only](https://github.com/microsoft/VibeVoice).

For text to speech, [Kitten TTS runs on CPU](https://github.com/KittenML/KittenTTS) without a GPU. gTTS calls [Google Translate's undocumented speech endpoint](https://github.com/pndurette/gTTS), so it needs the internet and can break without notice.

The skill repos aren't pip packages: they install into your coding agent, not your app. Django AI Skills and Sentry Skills follow the [Agent Skills](https://agentskills.io/) open format.

Write your app against the OpenAI API format, and you can switch between a hosted model and your own: vLLM, SGLang, and the LiteLLM proxy all speak it.
