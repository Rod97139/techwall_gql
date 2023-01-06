import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const yoga = createYoga({
    
    // définir le schéma de GraphQL
  schema: createSchema({
    // Notre contrat ce que nous offrons à notre serveur GraphQL
    typeDefs: /* GraphQL */ `
      type Query {
        hello(name: String): String!
      }
    `,

    // implémentation de notre contrat
    resolvers: {
      Query: {
        hello: (_,{name}) => `Hello ${name || "La mifa!" }`
      }
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})