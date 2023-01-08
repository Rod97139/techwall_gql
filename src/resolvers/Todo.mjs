import { db } from "../db/db.mjs"

export const Todo = {
    user: ( {userId}, arg, context, info ) => {
        return db.users.find((user) => user.id === userId)
    }
}