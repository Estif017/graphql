const UserResolvers=require('./users')
const PostResolvers=require('./posts')
const CommentResolvers=require('./comments')

module.exports={
    Post:{
        likeCount:(parent)=>parent.likes.length,
        commentCount:(parent)=>parent.likes.length
    },
    Query:{
        ...PostResolvers.Query
    },
    Mutation:{
        ...UserResolvers.Mutation,
        ...PostResolvers.Mutation,
        ...CommentResolvers.Mutation,
    },
    Subscription:{
        ...PostResolvers.Subscription
    }
}