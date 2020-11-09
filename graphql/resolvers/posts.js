const Post=require('../../models/Post')

module.exports = {
    Query:{
        async getPost(){
            try {
                const posts = await Post.find()
                return posts   
            } catch (error) {
                console.log('error occuered');
                throw new Error(error)
            }
        }
    }
}