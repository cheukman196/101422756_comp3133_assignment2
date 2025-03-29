const userTypeDefs = require('./user.schema');
const employeeTypeDefs = require('./employee.schema')
const { gql } = require('graphql-tag')

const typeDefs = gql`
    ${userTypeDefs},
    ${employeeTypeDefs}
`

module.exports = typeDefs;