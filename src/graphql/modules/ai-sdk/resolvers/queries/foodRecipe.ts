import type { ResolverProps } from '@composabase/sdk'
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import OpenAI from 'openai';

export default async function Resolver({ args }: ResolverProps) {
  const { dish, maxIngredients = 3, showImage = false } = args;

  const result = await generateObject({
    model: openai('gpt-4-turbo'),
    temperature: 0.5,
    maxTokens: 1024,
    schema: z.object({
      recipe: z.object({
        description: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            amount: z.string(),
          }),
        ),
        steps: z.array(z.string()),
        suggestion: z.object({
          starter: z.string(),
          drink: z.string(),
          dessert: z.string(),
        }),
      }),
    }),
    prompt: `Create a vibrant and flavorful recipe for ${dish}, with a maximum of ${maxIngredients} ingredients. Make sure the flavors and textures complement each other for a balanced, satisfying meal.  Serve the dish in an appealing way, and make sure the flavors and textures complement each other for a balanced, satisfying meal. Suggest one starter, drink and dessert that pair well.`,
  });

  if (!showImage) {
    return {
      ...result.object.recipe,
      image: null
    }
  }

  const openaiClient = new OpenAI();
  const openaiImageResponse = await openaiClient.images.generate({
    model: "dall-e-3",
    prompt: `Generate a realistic image of carefully plated ${dish}, following this description: ${result.object.recipe.description}. Incorporate the following suggested elements on the table starter: ${result.object.recipe.suggestion.starter}. Suggested drink: ${result.object.recipe.suggestion.drink} and suggested dessert: ${result.object.recipe.suggestion.dessert}. Ensure the scene is safe for work, with all food and drinks neatly arranged on a table. Use a studio photo style with a perspective angle to create a polished, professional look.`,
    n: 1,
    style: "natural",
    size: "1024x1024",
  })

  return {
    ...result.object.recipe,
    image: openaiImageResponse.data[0].url
  }

}
