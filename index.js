const {ApolloServer} = require('apollo-server')
const gql=require('graphql-tag')

const typeDefs=gql`
    type Query{
        sayHi:String!
    }

`

const resolvers={
    Query:{
        sayHi:()=>{return"Hello World"}
    }
}

const server=new ApolloServer({
    typeDefs,resolvers
})

server.listen({port:5000}).then(res=>console.log(`Server is running at port ${res.url}`))