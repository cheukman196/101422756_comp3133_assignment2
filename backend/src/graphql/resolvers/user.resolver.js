const User = require('../../model/user')
const bcrypt = require('bcrypt')

const resolvers = {
    Query: {
        // USER
        login: async (_, {username, password}) => {
            const user = await User.findOne({
                username: username
            });

            if(!user) return { message: "Login failed. Please try again." }
            const result = await bcrypt.compare(password, user.password);
            if(result)
                return { message: "Login successful", token: "mock-auth-token"}
            return { message: "Login failed. Please try again." }
        }
    },

    Mutation: {
        // USER
        signup: async (_, {username, email, password}) => {
            const saltRounds = 10; 
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                username: username,
                email: email,
                password: passwordHash
            });
            await newUser.save(); // persist to db
            return newUser;
        }
    }

}

module.exports = resolvers;