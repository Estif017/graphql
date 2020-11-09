const {gql}=require('apollo-server')

module.exports=gql`
type Post{
    id:ID!,
    body:String!,
    username:String!,
    createdAt:String!
}
type User{
    id:ID!,
    username:String!,
    email:String!,
    createdAt:String!,
    token:String!
}
input RegisterInput{
    username:String!,
    email:String!,
    password:String!,
    confirmPassword:String!
}
type Query{
    getPost:[Post]
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!,Password:String!):User!
  }

`