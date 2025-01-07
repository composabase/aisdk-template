import { createModule } from "@composabase/sdk"

const helloCustom = () => {
  const module = createModule('hello-custom')
  
  module.input('MyCustomInput', {
    fields: {
      name: module.string().optional(),
      isImportant: module.boolean().optional(),
    },
  })

  module.query('helloCustom', {
    definition: {
      type: module.string(),
      args: {
        input: module.input('MyCustomInput').optional(),
      },
    },
    resolver: 'hello',
  })

  return module
}

export default helloCustom()
