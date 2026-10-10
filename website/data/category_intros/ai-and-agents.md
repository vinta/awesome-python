Build a typed agent in Pydantic AI. Long-running, stateful agents suit LangGraph. Apps tied to one model vendor can use that vendor's Python AI agent library.

How to choose:

- Typed agents: Pydantic AI, or LangGraph for long-running, stateful ones
- Agents on Claude, OpenAI, or Gemini models: Claude Agent SDK, OpenAI Agents SDK, or Google ADK
- Skills for your coding agent: Django AI Skills, Sentry Skills, or Trail of Bits Skills
- MCP servers and clients: MCP Python SDK, or FastMCP to compose and proxy servers
- A personal assistant in your chat apps: Hermes Agent, or AstrBot for QQ, Feishu, and DingTalk
- Prompts tuned against a metric: DSPy
- Agent data: Instructor for structured output, LlamaIndex for RAG, Mem0 for memory
- Open models from the Hugging Face Hub: Transformers
- Serving open models: vLLM or SGLang, or MLX LM on Apple silicon
- One OpenAI-style API for many model providers: LiteLLM
- Image and video generation: Diffusers
- Fine-tuning: TRL with PEFT adapters, Unsloth for less GPU memory, Axolotl from YAML
- Speech: faster-whisper, FunASR for Chinese, gTTS for text to speech

Pydantic AI comes from the Pydantic team and is [typed end to end](https://pydantic.dev/docs/ai/overview/). Outputs, tools, and dependencies all carry types, so your type checker knows what an agent returns. Switching models takes one string. [Give an agent an output type and tools](https://github.com/pydantic/pydantic-ai), and every run comes back validated.

LangGraph is a [low-level orchestration framework](https://docs.langchain.com/oss/python/langgraph/overview) for long-running, stateful agents, and it can mix hand-coded steps with LLM-driven ones in one graph. For your first agent, its docs suggest LangChain's agents instead: [a minimal harness](https://docs.langchain.com/oss/python/langchain/overview) built on LangGraph, which you extend through middleware.

The Claude Agent SDK gives you [the tools and agent loop behind Claude Code](https://code.claude.com/docs/en/agent-sdk/overview), so it fits agents that read files, run commands, and edit code. Call `query()` for a one-off task, and switch to [`ClaudeSDKClient`](https://code.claude.com/docs/en/agent-sdk/python#choosing-between-query-and-claudesdkclient) when the next step depends on Claude's reply, as in a chat.

The OpenAI Agents SDK keeps to [a small set of primitives](https://openai.github.io/openai-agents-python/): use it when you want the runtime to handle turns, tool calls, handoffs, and guardrails for you. Despite the name, it [isn't limited to OpenAI models](https://github.com/openai/openai-agents-python).

Google ADK is [optimized for Gemini but model-agnostic](https://github.com/google/adk-python). Start a project with [`adk create`](https://adk.dev/get-started/python/).

All three skill collections install from a Claude Code plugin marketplace. Django AI Skills and Sentry Skills follow the open [Agent Skills](https://agentskills.io/) format, so other coding agents can load them too. Sentry Skills is [written for Sentry's own engineers](https://github.com/getsentry/skills), so some of its skills follow Sentry's internal standards.

CrewAI splits an app into Flows, which manage state and control execution, and Crews, teams of agents that work on one task together. For a production app, [start with a Flow](https://docs.crewai.com/en/introduction), and hand a Crew only the steps that need autonomy.

The MCP Python SDK reads each tool's schema [from its type hints and docstring](https://py.sdk.modelcontextprotocol.io/get-started/first-steps/), so you write no JSON Schema or request handlers. FastMCP wrote the high-level API that the SDK [took in](https://gofastmcp.com/getting-started/welcome). The standalone project is a fuller framework: it can [mount several servers into one](https://gofastmcp.com/servers/composition) and [proxy another MCP server](https://gofastmcp.com/servers/providers/proxy) through your own.

Hermes Agent talks to you on Telegram, Discord, Slack, WhatsApp, and Signal [from one gateway process](https://github.com/NousResearch/hermes-agent), and writes itself new skills as it works. Since it runs commands for whoever it lets in, allow only your own account on its gateway with an [allowlist](https://hermes-agent.nousresearch.com/docs/user-guide/security#user-authorization-gateway), and leave approval prompts on for dangerous commands. AstrBot covers chat apps such as QQ, Feishu, and DingTalk. It's AGPL, while Hermes Agent is MIT.

DSPy has you write [structured signatures, not prompts](https://dspy.ai/current/), and its optimizers tune the prompts for you. Before they can, [define a metric and score a baseline](https://dspy.ai/current/getting-started/metrics/) to beat.

Instructor [turns an LLM's reply into a validated Pydantic model](https://github.com/567-labs/instructor), and when validation fails, it retries with the error message. Its docs draw the line at [extraction versus agents](https://python.useinstructor.com/): Instructor for the first, Pydantic AI for the second.

LlamaIndex builds [agents over your own data](https://developers.llamaindex.ai/python/framework/). Its high-level API goes from documents to answers in a few lines, and its lower-level API lets you replace any part.

Mem0 gives an agent [memory of each user](https://github.com/mem0ai/mem0): search their memories before the model answers, then add the new exchange. Run it [as a library in your app](https://docs.mem0.ai/open-source/overview), or as a self-hosted server for a team.

Transformers is the [model definition that most training frameworks and inference engines share](https://huggingface.co/docs/transformers/index), Axolotl, Unsloth, vLLM, and SGLang among them. Load a model from the Hugging Face Hub with [`from_pretrained()`](https://huggingface.co/docs/transformers/quicktour), then run it through `Pipeline` for inference or `Trainer` for training. For large production deployments, its docs [send you to vLLM or SGLang](https://huggingface.co/docs/transformers/serve-cli/serving).

vLLM runs [batch inference offline or an OpenAI-compatible server](https://docs.vllm.ai/en/latest/getting_started/quickstart/), so apps written for the OpenAI API work unchanged. SGLang is [optimized for agentic workloads, RL rollouts, and large-scale serving](https://github.com/sgl-project/sglang). On a Mac, MLX LM [runs and fine-tunes models on Apple silicon](https://github.com/ml-explore/mlx-lm).

LiteLLM [returns every provider's responses in the OpenAI format](https://docs.litellm.ai/docs/) and maps their errors to OpenAI's exception types, so one code path covers them all. Use its Python SDK inside your app, or run its proxy as a self-hosted gateway for your team.

Diffusers centers on the [`DiffusionPipeline`](https://huggingface.co/docs/diffusers/index): a few lines generate an image, video, or audio clip.

Start fine-tuning with LoRA or QLoRA rather than training every weight, as both [PEFT](https://huggingface.co/docs/peft/methods/overview) and [Unsloth](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide) advise. TRL trains with methods from SFT to DPO and GRPO, and every TRL trainer takes a [`peft_config`](https://huggingface.co/docs/trl/peft_integration) for PEFT adapters. Axolotl keeps the whole pipeline, from dataset preprocessing to inference, in [one YAML file](https://github.com/axolotl-ai-cloud/axolotl).

faster-whisper reimplements Whisper on CTranslate2 for [the same accuracy in less time and memory](https://github.com/SYSTRAN/faster-whisper). For Chinese audio, FunASR's `AutoModel` [chains speech recognition with voice activity detection, punctuation, and speaker models](https://github.com/modelscope/FunASR) in one call. gTTS speaks through [Google Translate's undocumented speech feature](https://github.com/pndurette/gTTS), so upstream changes can break it without notice.
