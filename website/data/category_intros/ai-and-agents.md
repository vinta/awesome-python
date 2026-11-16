Committed to one model vendor? Use its agent SDK. Otherwise, build Python AI agents with Pydantic AI, or LangGraph when you need explicit control over state.

How to choose:

- Agent frameworks: pydantic-ai across model providers, langgraph for control over state, crewai for role-based teams
- One model vendor: claude-agent-sdk, openai-agents, or google-adk, whichever matches it
- Skills for your coding agent: django-ai-plugins for Django, trailofbits-skills for security, scientific-agent-skills for research
- MCP servers: fastmcp, or mcp for protocol-level control
- Running AI-written code without a container: pydantic-monty
- A personal agent that learns from use: hermes-agent, or AstrBot for a chatbot across chat apps
- Tuning prompts against a metric: dspy
- Agent data: instructor for structured output, llama-index for RAG, mem0 for long-term memory
- Pretrained models: transformers, or sentence-transformers for embeddings and reranking
- Local models: ollama for a shared server, llama-cpp-python for GGUF files, mlx-lm on Apple Silicon
- Serving open models: vllm, or benchmark sglang when requests share long prefixes
- Generating images and video: diffusers
- Fine-tuning: peft and trl in code, unsloth for speed and memory, axolotl for multi-GPU runs from YAML
- Speech: faster-whisper for transcription, gTTS for text to speech through Google Translate

### Pydantic AI

Pick Pydantic AI when you want agents in plain, typed Python and the freedom to change model vendors, since it puts [every model a string swap away](https://pydantic.dev/docs/ai/overview/). Outputs, dependencies, and tools are all typed, so your type checker knows what an agent returns. Start with the `Agent` class.

### LangGraph

Pick LangGraph for stateful, long-running agents where you need [explicit control over state and control flow](https://docs.langchain.com/oss/python/langgraph/overview). You build a `StateGraph` that mixes fixed steps with model calls, and it can checkpoint state, resume after a failure, and pause for a person to approve. For a straightforward agent, the LangChain team's own chooser [picks LangChain](https://docs.langchain.com/oss/python/concepts/products), which runs on LangGraph.

### CrewAI

Pick CrewAI when your problem splits into specialist roles: a crew of role-playing agents gets a team running with little code. For a production app, its docs say to [start with a Flow](https://docs.crewai.com/en/introduction), which holds the app's structure and state. Run a Crew inside a Flow step only where the task needs autonomous agents.

### OpenAI Agents SDK

Pick the OpenAI Agents SDK when you build on OpenAI's models and want the smallest loop to learn: it has [very few abstractions](https://openai.github.io/openai-agents-python/), mainly agents, handoffs, and guardrails. Define an `Agent` with instructions and tools, and the SDK runs the turns for you.

### Claude Agent SDK

Pick the Claude Agent SDK when the agent you want is Claude Code inside your own app: it gives you [the same tools, agent loop, and context management that power Claude Code](https://code.claude.com/docs/en/agent-sdk/overview). Call `query()` for a one-off task.

### Agent Development Kit

Pick ADK when your team builds on Google Cloud and Gemini: it's [optimized for Google's Gemini models](https://adk.dev/get-started/about/) and reaches other models through connectors. Its workflow agents run steps in sequence, in parallel, or in a loop without asking the model. Run `adk create` to start a project.

### Agent skill collections

Pick a skill collection by your work: django-ai-plugins for Django, DRF, and Celery, scientific-agent-skills for research with scientific Python packages, and trailofbits-skills for security audits and testing. sentry-skills holds the code review and pull request skills Sentry's own engineers use, and wshobson-agents covers Python, Django, FastAPI, testing, and packaging among many other plugins. Most of them follow the open [Agent Skills format](https://agentskills.io/): each skill is a folder your coding agent can use, with a `SKILL.md` file of instructions plus any scripts.

### FastMCP

Pick FastMCP to build an MCP server for production. It builds on the official SDK and [adds composition, middleware, proxying, and authentication providers](https://gofastmcp.com/docs/getting-started/upgrading/from-mcp-sdk-v2), plus a client. A server is a `FastMCP` instance, and each tool is a decorated Python function.

### MCP Python SDK

Use the official MCP Python SDK when you need protocol-level control, as when you build a gateway or a test harness around MCP. While you build, run your server with [`mcp dev`](https://py.sdk.modelcontextprotocol.io/), which opens it in the MCP Inspector.

### Monty

Pick Monty to run the Python a model writes inside your app, without the latency and cost of a container. Filesystem, environment variables, and network don't exist inside it: the code [reaches the host only through the functions you pass in](https://github.com/pydantic/monty). Run code through the `Monty` class.

### Hermes Agent and AstrBot

Pick Hermes Agent for one personal agent that gets better with use, and AstrBot to put a chatbot into the chat apps people already use. Hermes Agent [creates skills from experience](https://hermes-agent.nousresearch.com/docs) and builds a model of you across sessions, and you can talk to it from Telegram while it works on a server. AstrBot is [an all-in-one chatbot platform](https://github.com/AstrBotDevs/AstrBot) for messaging apps like QQ, Feishu, Telegram, and Slack, extended with plugins.

### DSPy

Pick DSPy when you want prompts tuned by data instead of by hand. You describe each task as a [signature, not a prompt](https://dspy.ai/current/), and run it through a module like `dspy.ChainOfThought`. Then you [give DSPy a training set and a metric](https://dspy.ai/current/getting-started/gepa-optimization/), and its optimizer rewrites your instructions.

### Instructor

Pick Instructor when all you need is structured data out of an LLM call. Its own docs draw the line at [Instructor for extraction, Pydantic AI for agents](https://python.useinstructor.com/), so move to Pydantic AI once the job needs tools. Describe the output as a Pydantic model, and create a client with `instructor.from_provider()`.

### LlamaIndex

Pick LlamaIndex to build RAG and agents over your own documents: it's [a toolkit for building LLM-powered agents over your data](https://developers.llamaindex.ai/python/framework/). Load your documents into a `VectorStoreIndex` and query it.

### Mem0

Pick Mem0 to give agents [long-term memory that persists across sessions](https://docs.mem0.ai/introduction), as a library you call through `Memory()` or as a self-hosted server. OpenViking instead lays out knowledge, memory, and skills as [a virtual filesystem agents browse](https://github.com/volcengine/OpenViking). It runs as a server under the AGPL. Semantica builds a knowledge graph with provenance, for teams that must [explain why an agent made a decision](https://github.com/semantica-agi/semantica).

### Transformers

Use Transformers to run or train a pretrained model. It's [the model-definition framework](https://huggingface.co/docs/transformers/index) that training tools like Axolotl and serving engines like vLLM build on. Start inference with `Pipeline`. For search, Sentence Transformers computes embeddings on top of it, and its docs [retrieve candidates with a bi-encoder, then rerank them with a cross-encoder](https://sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html).

### Ollama

Pick Ollama for the easiest local model server that your scripts and tools can share. The Python package is only a client: [Ollama must be installed and running](https://github.com/ollama/ollama-python) with a model pulled, and then you call `chat()`.

### llama-cpp-python

Pick llama-cpp-python to load a GGUF model file straight into your Python process. It's [Python bindings for llama.cpp](https://llama-cpp-python.readthedocs.io/en/latest/), which runs on the widest range of hardware, and the `Llama` class runs a model file.

### MLX LM

Pick MLX LM on an Apple Silicon Mac, where it [generates text and fine-tunes models with MLX](https://github.com/ml-explore/mlx-lm). It runs MLX-compatible models from the Hugging Face Hub. Load one with `load()`.

### vLLM

Start serving open models with vLLM. Its server [implements the OpenAI API](https://docs.vllm.ai/en/latest/getting_started/quickstart/), so apps written for OpenAI work against it, and `vllm serve` starts it. DeepInfer is the engine behind DeepSeek's own services, and its open release runs [offline inference for DeepSeek's models](https://github.com/deepseek-ai/DeepInfer), so pick it only for those.

### SGLang

Benchmark SGLang against vLLM when many requests share a long prefix, like one big system prompt, or agents replay long conversations. SGLang is [designed for low-latency serving with RadixAttention](https://docs.sglang.io/), which reuses shared prefixes, and it's compatible with OpenAI's API too. Start a server with `sglang serve`.

### Diffusers

Use Diffusers to generate images, video, or audio from pretrained diffusion models. [`DiffusionPipeline`](https://huggingface.co/docs/diffusers/index) runs a checkpoint in a few lines.

### TRL and PEFT

Write fine-tuning code with TRL and PEFT, the Hugging Face libraries that Unsloth and Axolotl build on. TRL supplies trainers for [SFT, DPO, GRPO, and reward modeling](https://huggingface.co/docs/trl/index), starting with `SFTTrainer`. PEFT adapts a model by training [a small number of extra parameters](https://huggingface.co/docs/peft/index), with methods like LoRA, and [every TRL trainer supports PEFT](https://huggingface.co/docs/trl/peft_integration).

### Unsloth

Pick Unsloth to fine-tune faster and with less GPU memory on your own hardware, as a Python library or a desktop app. Its docs [recommend starting with QLoRA](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide) on an Instruct model. Load the model with `FastLanguageModel`.

### Axolotl

Pick Axolotl for reproducible runs across several GPUs or nodes. [One YAML file](https://docs.axolotl.ai/) drives dataset preprocessing, training, evaluation, quantization, and inference, and `axolotl train` runs it.

### faster-whisper

Transcribe with faster-whisper on an NVIDIA GPU. It's [a reimplementation of OpenAI's Whisper model](https://github.com/SYSTRAN/faster-whisper) that runs the same models with the same accuracy, only faster. Load a model with `WhisperModel`. openai-whisper is OpenAI's original code for those models. FunASR is a toolkit where you [choose the task, checkpoint, and runtime separately](https://github.com/modelscope/FunASR), with streaming transcription, speaker pipelines, and emotion tags.

### gTTS

Pick gTTS for quick text to speech, from Python or its command-line tool. It sends text to [Google Translate's text-to-speech API](https://gtts.readthedocs.io/en/latest/) and writes back MP3 audio. Create a `gTTS` object with your text, then save it.
