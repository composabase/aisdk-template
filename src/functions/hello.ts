import { Context } from "hono";
import { Config } from "@composabase/functions";

import { client } from '@composabase/functions'

export default async function Handler(c: Context) {
  const { name = 'World' } = c.req.param();

  const loremResponse = await client.get(`/lorem`)
  const loremData = await loremResponse.json()

  const loremHtmlResponse = await client.post(`/lorem-html`)
  const loremHtmlResponseData = await loremHtmlResponse.text()

  return c.json({
    message: `Hello, ${name}!`,
    lorem: loremData,
    html: loremHtmlResponseData
  });
}

export const config: Config = {
  method: "GET",
  path: "/hello/:name?",
};
