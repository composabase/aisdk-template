# Composabase Local Development - AI SDK template

Welcome to the AI SDK template for the Composabase local playground. This guide will help you get started with the setup and usage of this on your local environment.

## Getting Started

### Prerequisites

Before you begin, make sure you have cloned your project repository.

SSH:
```bash
git clone $REPO_SSH_URL
```

HTTPS:
```bash
git clone $REPO_URL
```

Next, install the project dependencies using one of the following commands:

```bash
yarn
```

or

```bash
npm install
```

To interact with this template, you need to use the [Composabase CLI](https://www.npmjs.com/package/@composabase/cli), which should be installed globally. To install it, run one of the following commands:

```bash
yarn global add @composabase/cli
```

or

```bash
npm install -g @composabase/cli
```

### Logging In

As the first step, you will need to login to the Composabase Dashboard in your terminal. Use the following command:

```bash
composabase login
```

### Fetching Environment Variables

After logging in, next step will fetch the necessary environment variables from the Composabase Dashboard using this command:

```bash
composabase pull:env
```

#### Pull GraphQL schema

Pull GraphQL schema from your Composabase project. This command will create the GraphQL schema file in the @composabase/client directory.

```bash
composabase pull:schema
```

This step ensures that your local GraphQL schema definitions are up-to-date.

### Starting the Local Playground

Finally, you can start the local development environment using the following command:

```bash
yarn start
```

or

```bash
npm run start
```

This command launches the development server and allows you to begin working with your GraphQL queries and resolvers locally.

### Testing the Local Payground

If everything went well, you should be able to access the Composabase GraphQL Playground at [http://localhost:4000](http://localhost:4000).

As part of this template we added some custom resolvers. You can find them in the `src/graphql` folder.

#### The `hello` query

This query returns a simple string.

Arguments:
- `name`: String
- `isImportant`: Boolean

You can test it by executing the following query in the GraphQL Playground:

```graphql
query hello {
  hello(name: "John Doe", isImportant: true)
}
```

And will answer with the following response:

```json
{
  "data": {
    "hello": "Hello John Doe!"
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/schema.ts](src/graphql/schema.ts)
- Resolver: [src/graphql/resolvers/queries/hello.ts](src/graphql/resolvers/queries/hello.ts)

#### The `helloCustom` query

This query returns a simple string

Arguments:
- `input`: MyCustomInput
  - `name`: String
  - `isImportant`: Boolean

You can test it by executing the following query in the GraphQL Playground:

```graphql
query helloCustom {
  helloCustom(input: { name: "Composabase", isImportant: true })
}
```

And will answer with the following response:

```json
{
  "data": {
    "helloCustom": "Hello Composabase!"
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/hello-custom/index.ts](src/graphql/modules/hello-custom/index.ts)
- Resolver: [src/graphql/modules/hello-custom/resolvers/queries/hello.ts](src/graphql/modules/hello-custom/resolvers/queries/hello.ts)

#### AI SDK Providers

Before you use this examples, make sure you add your API key tokens for the AI SDK Provider you are testing; `OPENAI_API_KEY` for Open AI and `ANTHROPIC_API_KEY` for Anthropic. 

At you `.env` file

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

At your project settings [https://dashboard.composabase.com/$WORKSPACE/$PROJECT/settings](https://dashboard.composabase.com/$WORKSPACE/$PROJECT/settings)

For more information about AI SDK Providers support read the docs at [https://sdk.vercel.ai/providers/ai-sdk-providers](https://sdk.vercel.ai/providers/ai-sdk-providers)

#### The `holiday` query

This query take advantage of the `generateText` function from the `ai` sdk and allows you via arguments which AI provider you want to use between `anthropic` or `openai`.

Arguments:
- `provider`: Provider Enum values `anthropic` and `openai`
- `model`: String
- `type`: Provider Enum values `casual`, `geek`, `scifi` (optional)

You can test it by executing the following query example in the GraphQL Playground:

```graphql
query holiday {
  holidayAnthropic: holiday(
    provider: anthropic
    model: "claude-3-haiku-20240307"
  )

  holidayOpenai: holiday(
    provider: openai
    model: "gpt-4-turbo"
    type: scifi
  )
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/ai-sdk/index.ts](src/graphql/modules/ai-sdk/index.ts)
- Resolver: [src/graphql/modules/ai-sdk/resolvers/queries/holiday.ts](src/graphql/modules/sci-fi/resolvers/queries/holiday.ts)

#### The `foodRecipe` query

This query take advantage of the `generateObject` function from the `ai` sdk and halps you generating structured data from your AI call.

Arguments:
- `dish`: String
- `maxIngredients`: Integer
- `showImage`: Boolean

You can test it by executing the following query example in the GraphQL Playground:

```graphql
query foodRecipe {
  foodRecipe(
    dish: "Lasagna"
    maxIngredients : 7
    showImage: true
  ) {
    description
    ingredients {
      name
      amount
    }
    steps
    suggestion {
      entry
      drink
      dessert
    }
    image
  }  
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/ai-sdk/index.ts](src/graphql/modules/ai-sdk/index.ts)
- Resolver: [src/graphql/modules/ai-sdk/resolvers/queries/foodRecipe.ts](src/graphql/modules/sci-fi/resolvers/queries/foodRecipe.ts)


Remember that this guide assumes you have basic familiarity with command-line tools and development environments. If you encounter any issues, refer to the Composabase documentation or seek assistance from our support team.

Happy coding!
