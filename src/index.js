import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { db } from './db/db.mjs'
import { Query } from './resolvers/Query.mjs'
import { Todo } from './resolvers/Todo.mjs'
import { User } from './resolvers/User.mjs'
import { Mutation } from './resolvers/Mutation.mjs'
import { Subscription } from './resolvers/Subscription.mjs'

const pubsub = createPubSub()

const yoga = createYoga({
    
    // définir le schéma de GraphQL
  schema: createSchema({
    // Notre contrat ce que nous offrons à notre serveur GraphQL
    typeDefs: /* GraphQL */`

        type Query {
              hello(name: String): String!
              getTodos: [Todo]!
              getTodoById(id: Int): Todo!
              getUsers: [User]!
              getUserById(id: Int): User!
                }
        
        type Mutation {
          addTodo(addTodoInput: TodoAddInput): Todo! 
          updateTodo(id: Int!, updateTodoInput: TodoUpdateInput!): Todo!
          deleteTodo(id: Int!): Todo!

        }

        type Subscription {
          todo: Todo!
        }


      enum TodoStatusEnum {
        WAITING
        IN_PROGRESS
        CANCLED
        DONE
      }
    
      type Todo {
        id: ID!
        name: String!
        content: String!
        status: TodoStatusEnum!
        user: User!
      }

      type User {
        id: ID!
        name: String!
        email: String!
        todos: [Todo]
      }
      
      input TodoAddInput {
        name: String!
        content: String!
        userId: Int!
      }
      
      input TodoUpdateInput {
        name: String
        content: String
        userId: Int
        status: TodoStatusEnum
      }

      `,

    
    resolvers: {
      Query,
      Mutation,
      Subscription,
      Todo,
      User
      
      
    }

  }),
  context: {
    db,
    pubsub
  }
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})