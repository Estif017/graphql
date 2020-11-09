const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

const {MONGODB}=require('./config')
const typeDefs=require('./graphql/typeDefs')
const resolvers=require('./graphql/resolvers')

mongoose.
    connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=>{
        console.log(`Mongodb connected`);
        return server.listen({port:5000})
    })
    .then(res=>console.log(`Server is running at port ${res.url}`))

const server=new ApolloServer({
    typeDefs,resolvers
})
