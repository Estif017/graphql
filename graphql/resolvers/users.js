const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const {SECRET_KEY}=require('../../config')
const {validateRegisterInput}=require('../../utils/validators')

module.exports={
    Mutation:{
        async register(
            _,//parent
            {registerInput:{username,email, password,confirmPassword}},
            context,info){
                
                // TODO validate user data
                const {valid,errors}=validateRegisterInput(username,email, password, confirmPassword)
                if (!valid){
                    throw new UserInputError("Error",{errors})
                }
                // TODO Make sure user already exit
                const user=await User.findOne({username})
                if (user){
                    throw new UserInputError(`UserName is taken`,{
                        errors:{
                            username:`This ${username} userName is already taken`
                        }
                    })
                }
                
                // TODO hash password and create an auth token
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