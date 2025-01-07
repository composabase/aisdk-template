import * as dotenv from 'dotenv'
import { server } from "@composabase/sdk"
import schema from "@composabase/graphql/schema"

dotenv.config()

server({
  schema,
})
