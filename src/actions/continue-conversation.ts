'use server';
import { OPENAI_MODEL } from '@/config/constants';
import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai(OPENAI_MODEL),
    messages,
  });
  const data = { test: 'hello' };
  const stream = createStreamableValue(result.textStream);
  return { message: stream.value, data };
}