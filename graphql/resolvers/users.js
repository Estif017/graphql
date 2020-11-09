const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const {SECRET_KEY}=require('../../config')

module.exports={
    Mutation:{
        async register(
            _,//parent
            {registerInput:{username,email, password,confirmPassword}},
            context,info){
            password=await bcrypt.hash(password,12)
            const newUser= new User({
                username,
                email,
                password,
                createdAt:new Date().toISOString()
            })

            const res=await newUser.save()//save to the database

            const token = jwt.sign({
                id:res.id,
                email:res.email,
                username:res.username
            },SECRET_KEY,{expiresIn:'1h'})
            return{
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}