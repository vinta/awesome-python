import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config.js';

const client = new Anthropic({ apiKey: config.anthropic.apiKey });

export async function haiku(systemPrompt, userMessage, maxTokens = 1024) {
  const msg = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });
  return msg.content[0]?.text ?? '';
}

export async function sonnet(systemPrompt, userMessage, maxTokens = 2048) {
  const msg = await client.messages.create({
    model: config.anthropic.modelDeep,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });
  return msg.content[0]?.text ?? '';
}
