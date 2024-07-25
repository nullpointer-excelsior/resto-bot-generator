import { openai } from '@ai-sdk/openai';
import { streamText, StreamData } from 'ai';
import { OPENAI_MODEL } from '../../../config/constants';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const data = new StreamData();
  data.append({ test: 'value' });

  const result = await streamText({
    model: openai(OPENAI_MODEL),
    messages,
    onFinish() {
      data.close();
    },
  });

  return result.toAIStreamResponse({ data });
}