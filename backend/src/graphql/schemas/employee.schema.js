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

    type EmployeeResponse {
        success: Boolean!
        message: String!
        employee: Employee
    }

    type EmployeesResponse {
        success: Boolean!
        message: String!
        employees: [Employee]!
    }

    enum Gender {
        Male
        Female
        Other
    }

    type Query {
        # EMPLOYEE
        getAllEmployees: EmployeesResponse!
        searchEmployeeById(id: ID!): EmployeeResponse!
        searchEmployeeByDesignationOrDepartment(
            designation: String,
            department: String
        ): EmployeesResponse!
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
        ):EmployeeResponse!
        
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
        ):EmployeeResponse!

        "deletes employee by id"
        deleteEmployee(id: ID!): EmployeeResponse!
    }
`

module.exports = employeeTypeDef;