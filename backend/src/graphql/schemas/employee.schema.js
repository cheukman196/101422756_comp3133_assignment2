const { gql } = require('graphql-tag')

// custom scalars see below
// https://stackoverflow.com/questions/49693928/date-and-json-in-type-definition-for-graphql

const employeeTypeDef = gql`
    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: Gender
        designation: String!
        salary: Float!

        # date types are treated as String for now
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String
        updated_at: String    
    }

    enum Gender {
        Male
        Female
        Other
    }

    type Query {
        # EMPLOYEE
        getAllEmployees: [Employee]!
        searchEmployeeById(id: ID!): Employee
        searchEmployeeByDesignationOrDepartment(
            designation: String,
            department: String
        ): [Employee]!
    }

    type Mutation {
        # EMPLOYEE
        "creates employee by required fields"
        createEmployee(
            first_name: String!,
            last_name: String!,
            email: String!,
            gender: Gender,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String
        ):Employee!
        
        "updates employee by id and optional fields"
        updateEmployee(
            id: ID!,
            first_name: String,
            last_name: String,
            email: String,
            gender: Gender,
            designation: String,
            salary: Float,
            date_of_joining: String,
            department: String,
            employee_photo: String
        ):Employee!

        "deletes employee by id"
        deleteEmployee(id: ID!): Boolean!
    }
`

module.exports = employeeTypeDef;