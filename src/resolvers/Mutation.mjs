export const Mutation = {
    addTodo: (parent, { addTodoInput }, { db, pubsub }, info) => {
       // On doit tout d'abbord verifier que le userId est correct
       if (!existInArray(db.users, 'id', addTodoInput.userId)) {
          // Si ko
            //déclencher une erreur
            throw new Error('L\'id user ne match pas')
       }else{
        // Sinon
            // je dois créer un id
            // définir le status
            //ajouter le nouveau todo dans la db
            //retourner le nouveau todo
            const newTodo = {
                id: db.todos[db.todos.length -1].id +1,
                status: 'WAITING',
                ...addTodoInput
            }
            db.todos.push(newTodo)
            pubsub.publish('todo',{todo: {todo: newTodo, mutation: "ADD"}})
            return newTodo
       }
        
    },
    updateTodo: (parent, { id, updateTodoInput }, { db, pubsub }, info) => {
        if (updateTodoInput.userId && !existInArray(db.users, 'id', updateTodoInput.userId)) {
              throw new Error('L\'id user ne match pas')
        }else{
            const todo = db.todos.find((todoItem) => todoItem.id === id)
            if (!todo) {
                throw new Error('Le todo n\'existe pas')
            }else{
                for(let key in updateTodoInput) {
                    todo[key] = updateTodoInput[key]
                }
                
                pubsub.publish('todo',{todo: {todo, mutation: "UPDATE"}})
                return todo
            }
            
        }
    },
    deleteTodo:(parent, { id }, { db, pubsub }, info) => {
        const indexTodo = db.todos.findIndex((todo) => todo.id === id)
        if (indexTodo === -1) {
            throw new Error('Todo inexistant')
        }else{
            const [todo] = db.todos.splice(indexTodo, 1);
            pubsub.publish('todo',{todo: {todo, mutation: "DELETE"}})
            return todo
        }
    }
}

function existInArray(array, attribut, value) {
    return array.some((element) => element[attribut] == value)
}