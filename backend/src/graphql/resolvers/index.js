const employeeResolvers = require('./employee.resolver')
const userResolvers = require('./user.resolver')

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...employeeResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...employeeResolvers.Mutation
    }
}

module.exports = resolvers;