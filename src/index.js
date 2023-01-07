import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const typeDef = "src/schema/schema.graphql"

const yoga = createYoga({
    
    // définir le schéma de GraphQL
  schema: createSchema({
    // Notre contrat ce que nous offrons à notre serveur GraphQL
    typeDefs: /* GraphQL */`

      enum todoStatusEnum {
        WITING
        IN_PROGRESS
        CANCLED
        DONE
      }
    
      type todo {
        id: ID!
        name: String!
        content: String!
        status: todoStatusEnum!
      }

      type Query {
      hello(name: String): String!
        }`,

    // implémentation de notre contrat
    resolvers: {
      Query: {
        hello: (_,{name}) => `Hello ${name || "World!" }`
      }
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})