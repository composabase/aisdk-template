import type { ResolverProps } from '@composabase/sdk'
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { CoreMessage, generateText } from 'ai';

const providers = {
  openai: openai,
  anthropic: anthropic,
}

const messages = {
  default: [],
  casual: [
    {
      role: 'system',
      content: "You are a casual assistant, respond in 100 words using plain text format."
    }, 
    {
      role: 'system',
      content: "Make sure you use some topics among Movies, Music, TV Shows and Books."
    }
  ],
  geek: [
    {
      role: 'system',
      content: "You are a geek fan assistant, respond in 100 words using plain text format."
    }, 
    {
      role: 'system',
      content: "Make sure you use some topics among Avengers, Harry Potter, Lord of the Rings, Game of Thrones and Doctor Who."
    }
  ],
  scifi: [
    {
      role: 'system',
      content: "You are a sci-fi fan assistant, respond in 100 words using plain text format."
    }, 
    {
      role: 'system',
      content: "Make sure you use some topics among Star Wars, Star Trek, Alien, Far Scape and Starship Troopers."
    }
  ]
}

type ArsProps = {
  provider: keyof typeof providers;
  model: string;
  type?: 'default' | 'casual' | 'geek' | 'scifi';
}

export default async function Resolver({ args }: ResolverProps) {
  const {
    provider,
    model,
    type = 'default',
  }: ArsProps = args

  const aiProvider = providers[provider as keyof typeof providers];
  const { text } = await generateText({
    model: aiProvider(model),
    messages: [
      ...messages[type],
      { role: 'user', content: 'Invent a new holiday and describe its traditions.' }
    ] as CoreMessage[],
  });

  return text
}
