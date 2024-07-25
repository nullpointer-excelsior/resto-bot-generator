'use server';
import { randomUUID } from 'crypto';
import { createStreamableValue, readStreamableValue } from 'ai/rsc';
import { CoreMessage, generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { OPENAI_MODEL } from '@/config/constants';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { restaurantService } from '../core/services/RestaurantService';

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai(OPENAI_MODEL),
    messages,
  });

  const data = { test: 'hello' };
  const stream = createStreamableValue(result.textStream);
  return { message: stream.value, data };
}

export async function uploadMenuToFilesystem(data: FormData) {
  const file: File | null = data.get('file') as unknown as File;

  if (!file) throw new Error('No file uploaded');

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), file.name);
  await writeFile(path, buffer);

  console.log(`open ${path} to see the uploaded file`);

  return { success: true };
}

export async function uploadMenu(data: FormData) {
  const file: File | null = data.get('file') as unknown as File;
  if (!file) throw new Error('No file uploaded');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  console.log(`Base64 representation: `);

  const result = await generateText({
    model: openai(OPENAI_MODEL),
    messages: [
      {
        content: [
          { type: 'text', text: 'Del siguiente contenido extrae todo el texto y descripciones en formato markdown' },
          {
            type: 'image',
            image: base64,
          },
        ],
        role: 'user'
      }
    ]
  });
  const id = randomUUID()
  await restaurantService.save({
    id,
    name: 'Restaurant de churros',
    menu: result.text,
  })
  return { message: 'ok', data: result.text, id };
}