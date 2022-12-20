const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.export = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            // check if an user already exists
            const existUser = await User.findOne({ email });

            // throw an error if the user already exists
            if (existUser) {
                throw new ApolloError('User already exists', 400);
            }
            
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // build out mongoose model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: hashedPassword
            });

            // create JWT token for the User model
            const token = JWT.sign({
                user_id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }, process.env.SECRET_KEY, { expiresIn: '1h' });

            newUser.token = token;

            // save the user to the database
            const res = await newUser.save();
            
            // return the user
            return {
                id: res._id,
                ...res._doc
            };

        },
        async loginUser(_, { loginInput: { email, password } }) { 
            // check if the user exists
            const user = await User.findOne({ email });

            // check if the entered password matches the password in the database
            if(user && (await bcrypt.compare(password, user.password))) {
                
                // create new JWT token
                const token = JWT.sign({
                    user_id: user._id,
                    email: user.email,
                    username: user.username
                }, process.env.SECRET_KEY, { expiresIn: '1h' });

               // attach the token to the user
                user.token = token;
                
                return {
                    id: user._id,
                    ...user._doc
                };
            } else {
                throw new ApolloError('Invalid credentials', 400);
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID)
    }
}