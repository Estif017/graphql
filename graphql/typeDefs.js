const {gql}=require('apollo-server')

module.exports=gql`
type Post{
    id:ID!,
    body:String!,
    username:String!,
    createdAt:String!,
    comments:[comment]!,
    likes:[like]!,
    likeCount:Int!,
    commentCount:Int!
}
type User{
    id:ID!,
    username:String!,
    email:String!,
    createdAt:String!,
    token:String!
}
type comment{
    id:ID!,
    body:String!,
    username:String!,
    createdAt:String!
}
type like{
    id:ID!,
    username:String!,
    createdAt:String!
}
input RegisterInput{
    username:String!,
    email:String!,
    password:String!,
    confirmPassword:String!
}
type Query{
    getPosts:[Post],
    getPost(postId:ID!):Post!
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!,password:String!):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
    createComment(postId:ID!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID):Post!
  }

  type Subscription{
      newPost:Post!
  }

`