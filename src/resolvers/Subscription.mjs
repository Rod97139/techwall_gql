export const Subscription = {
    todo: {
        subscribe: (parent, args, { pubsub }, info) => {
            
            return pubsub.subscribe('todo')
            
        }
    }
}