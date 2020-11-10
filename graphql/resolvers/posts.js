const { AuthenticationError } = require('apollo-server');
const Post=require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find().sort({createdAt:-1})
                return posts   
            } catch (error) {
                console.log('error occuered');
                throw new Error(error)
            }
        },
        async getPost(_,{postId}){
            try {
                const post= await Post.findById(postId)
                if (post){
                    return post
                }else{
                    throw new Error("post not found")
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        
    }, 
    Mutation:{
        async createPost(_,{body},context){
            const user =checkAuth(context)
            //passed the middleware(checke the user loged in )
            const newPost=new Post({
                body,
                user:user.id,
                username:user.username,
                createdAt:new Date().toISOString()
            })
            const post = await newPost.save()
            return post
        },
        async deletePost(_,{postId},context){
            const user=checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if(user.username===post.username){
                    await post.delete()
                    return "Post deleted sucessfully"
                }else{
                    throw new AuthenticationError("Action not Allowed")
                }
            } catch (error) {
                console.log(error.message);
                throw new Error(error)
            }
        }
    },
}