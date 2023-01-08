import { db } from "../db/db.mjs";

export const User = {
    todos: ({ id }, args, context, info) => {
        return db.todos.filter((todo) => todo.userId === id)
    }
} 