## installation:

`npm i` ou `npm install`

`npm start`

## get all todos: 

query {
  getTodos {
    id
    name
    user {
      id
      email
    }
  }
}

## add todo:

mutation {
  addTodo(addTodoInput: {
     name: "newTodo", 
    content:"Ceci est un new Todo", 
    userId: 1
  }) {
    id
    status
    name
    user{
      id
      name
    }
  }
}

## delete todo:

mutation{
  deleteTodo(id: 2) {
    id
    name
  }
}

## update todo:

mutation {
  updateTodo(id: 2, updateTodoInput: {
    userId: 1,
    name: "updated Todo"
  }) {
     ...todoData 
  }
}

fragment todoData on Todo {
  id
  name
  content
  status
  user{
    id
    email
  }
}

## subscription:

subscription {
 todo {
  todo {
    id
    name
    content
    user {
      id
      name
      email
    }
  }
  mutation
}
}

## Documentation utilisée:

"https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions"