import { db } from "../db/db.mjs"

export const Query = {
    hello: (_,{name}) => `Hello ${name || "World!" }`,
    getTodos: () => {return db.todos}
  }