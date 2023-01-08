import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { db } from './db/db.mjs'
import { Query } from './resolvers/Query.mjs'
import { Todo } from './resolvers/Todo.mjs'
import { User } from './resolvers/User.mjs'
import { Mutation } from './resolvers/Mutation.mjs'

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
        user: User!
      }

      type User {
        id: ID!
        name: String!
        email: String!
        todos: [Todo]
      }

      type Query {
      hello(name: String): String!
      getTodos: [Todo]!
      getTodoById(id: Int): Todo!
      getUsers: [User]!
      getUserById(id: Int): User!
        }
        
      type Mutation {
        addTodo(addTodoInput: TodoAddInput): Todo! 

      }
      
      input TodoAddInput {
        name: String!
        content: String!
        userId: Int!
      }

      `,

    
    resolvers: {
      Query,
      Todo,
      User,
      Mutation
    }

  }),
  context: {
    db
  }
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})