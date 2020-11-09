const UserResolvers=require('./users')
const PostResolvers=require('./posts')

module.exports={
    Query:{
        ...PostResolvers.Query
    }
}