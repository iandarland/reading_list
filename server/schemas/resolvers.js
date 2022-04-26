const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    //resolvers go here
    Query : {
        //Queries go here
        me: async (parent, args, context)=>{
            if(context.user){
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password');

                return userData
            }

            throw new AuthenticationError('User must be signed in')
        }
    },
    
    Mutation: {
        //Mutations Go here
        createUser: async (parent, args) => {
            const newUser = await User.create(args)
            const token = signToken(newUser)

            return { newUser, token }
        },

        loginUser: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            
            if(!user){
                throw AuthenticationError('Incorrect Credentials')
            }
            
            const verifyPass = await user.isCorrectPassword(password)

            if(!verifyPass){
                throw AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user)

            return {user, token}
        }
    }
}

module.exports = resolvers