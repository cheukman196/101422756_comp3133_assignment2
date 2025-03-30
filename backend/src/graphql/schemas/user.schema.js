const { gql } = require('graphql-tag')

const userTypeDef = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        created_at: String
        updated_at: String    
    }

    type LoginResponse {
        success: Boolean!
        message: String!
        token: String
    }

    type SignupResponse {
        success: Boolean!
        message: String!
        user: User
    }

    type Query {
        # USER
        "login with username and password"
        login(username: String!, password: String!):LoginResponse!
    }

    type Mutation {
        # USER
        "signup with username, email and password"
        signup(
            username: String!, 
            email: String!, 
            password: String!, 
        ):SignupResponse!
    }
`

module.exports = userTypeDef;