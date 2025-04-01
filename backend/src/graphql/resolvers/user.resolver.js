const User = require('../../model/user')
const bcrypt = require('bcrypt')

const resolvers = {
    Query: {
        // USER
        login: async (_, {username, password}) => {
            const user = await User.findOne({
                username: username
            });

            if(!user) return { success: false, message: "Login failed. Please try again.", token: null }
            const result = await bcrypt.compare(password, user.password);
            if(result)
                return { success: true, message: "Login successful", token: `${user.username}`}
            return { success: false, message: "Login failed. Please try again.", token: null }
        }
    },

    Mutation: {
        // USER
        signup: async (_, {username, email, password}) => {
            const existingUser = await User.findOne({
                $or: [{ username: username}, {email: email }]
            });

            if (existingUser) {
                return { 
                    success: false,
                    message: "User with given username or email already exists.", 
                    user: null };
            }

            const saltRounds = 10; 
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                username: username,
                email: email,
                password: passwordHash
            });
            await newUser.save(); // persist to db
            return { 
                success: true,
                message: "User created successfully", 
                user: newUser };
        }
    }

}

module.exports = resolvers;