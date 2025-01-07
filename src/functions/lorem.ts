import { Context } from "hono";

export default async function Handler(c: Context) {
  return c.json({
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  });
}
