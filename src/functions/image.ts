import { Context } from "hono";

// import { openai } from '@ai-sdk/openai';
// import { experimental_generateImage, Message, streamText, tool } from 'ai';
// import { z } from 'zod';

// export default async function Handler(c: Context) {
//   // const { messages }: { messages: Message[] } = await request.json();

//   // // filter through messages and remove base64 image data to avoid sending to the model
//   // const formattedMessages = messages.map(m => {
//   //   if (m.role === 'assistant' && m.toolInvocations) {
//   //     m.toolInvocations.forEach(ti => {
//   //       if (ti.toolName === 'generateImage' && ti.state === 'result') {
//   //         ti.result.image = `redacted-for-length`;
//   //       }
//   //     });
//   //   }
//   //   return m;
//   // });

//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages: [
//       {
//         role: 'user',
//         content: 'Generate an image of Santa driving a Cadillac',
//       },
//     ],
//     tools: {
//       generateImage: tool({
//         description: 'Generate an image',
//         parameters: z.object({
//           prompt: z.string().describe('The prompt to generate the image from'),
//         }),
//         execute: async ({ prompt }) => {
//           const { image } = await experimental_generateImage({
//             model: openai.image('dall-e-3'),
//             prompt,
//           });

//           return { image: image.base64, prompt };
//         },
//       }),
//     },
//   });

//   return result.toDataStreamResponse()
// }

import { 
  experimental_generateImage as generateImage,
} from 'ai';
import { openai } from '@ai-sdk/openai';

export default async function Handler(c: Context) {
  const prompt = c.req.query('prompt');

  if (!prompt) {
    return c.html(`<p>Missing prompt query parameter</p>`);
  }

  const { image } = await generateImage({
    model: openai.image('dall-e-3'),
    prompt,
    size: '1024x1024',
    
  });

  return c.html(`<p>Promt: ${prompt}</p><hr/><p><img src="data:image/png;base64, ${image.base64}" alt="${prompt}" /></p>`);
}
