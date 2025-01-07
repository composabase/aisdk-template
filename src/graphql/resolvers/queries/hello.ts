import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ args }: ResolverProps) {
  const { name = 'World', isImportant = false } = args 

  return `Hello ${name}${isImportant ? '!' : ''}`
}
