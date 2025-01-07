import { Context } from "hono";
import { stream } from 'hono/streaming'
import { openai } from '@ai-sdk/openai';
import {
  streamText,
  experimental_wrapLanguageModel as wrapLanguageModel,
} from 'ai';
import { cacheMiddleware } from '@composabase/utils/ai-sdk';

export default async function Handler(c: Context) {

  const wrappedModel = wrapLanguageModel({
    model: openai('gpt-4-turbo'),
    middleware: cacheMiddleware,
  });  

  const { textStream } = streamText({
    model: wrappedModel,
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
    })
    // Write a Uint8Array.
    await stream.write(new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]))
    // Pipe a readable stream.
    await stream.pipe(textStream)
  })
}