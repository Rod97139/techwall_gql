export const Mutation = {
    addTodo: (parent, { addTodoInput }, { db }, info) => {
       // On doit tout d'abbord verifier que le userId est correct
       if (!db.users.some((user) => user.id === addTodoInput.userId)) {
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
            return newTodo
       }
        
    }
}