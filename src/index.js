import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { Query } from './resolvers/Query.mjs'

const typeDef = "src/schema/schema.graphql"

const yoga = createYoga({
    
    // définir le schéma de GraphQL
  schema: createSchema({
    // Notre contrat ce que nous offrons à notre serveur GraphQL
    typeDefs: /* GraphQL */`

      enum todoStatusEnum {
        WAITING
        IN_PROGRESS
        CANCLED
        DONE
      }
    
      type Todo {
        id: ID!
        name: String!
        content: String!
        status: todoStatusEnum!
      }

      type Query {
      hello(name: String): String!
      getTodos: [Todo]!
        }`,

    // implémentation de notre contrat
    resolvers: {
      Query
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})