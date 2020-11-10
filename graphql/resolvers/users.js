const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const {SECRET_KEY}=require('../../config')
const {validateRegisterInput, validateLoginInput}=require('../../utils/validators')

const generateToken=user=>{
    return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    },SECRET_KEY,{expiresIn:'1h'})
}

module.exports={
    Mutation:{
        async login(_,{username,password},){
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong crendetials';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            _,//parent
            {registerInput:{username,email, password,confirmPassword}},){
        
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
        
            const token=generateToken(res)
        
            return{
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}
