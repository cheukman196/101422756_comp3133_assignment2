  

# GraphQL APIs


## Employee API
### Employee 

``` graphql
type Employee {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
  gender: Gender
  designation: String!
  salary: Float!
  date_of_joining: String!
  department: String!
  employee_photo: String
  created_at: String
  updated_at: String
}
```
### Gender Enum 

``` graphql
enum Gender {
  Male
  Female
  Other
}
```

### Queries
- `getAllEmployees`: Retrieves a list of all employees.

``` graphql
  getAllEmployees: [Employee]!
```

- `searchEmployeeById`: Searches for an employee by their ID.

``` graphql
  searchEmployeeById(id: ID!): Employee
```

- `searchEmployeeByDesignationOrDepartment`: Searches for employees by their designation or department.

``` graphql
  searchEmployeeByDesignationOrDepartment(
    designation: String,
    department: String
  ): [Employee]!
```
  

### Mutations

- `createEmployee`: Creates a new employee with the required fields.

``` graphql
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
  ): Employee!
```

- `updateEmployee`: Updates an existing employee by their ID and optional fields.  

``` graphql
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
  ): Employee!
```
  
- `deleteEmployee`: Deletes an employee by their ID.

``` graphql
  deleteEmployee(id: ID!): Boolean!
```
 
## User API

  

### User 

``` graphql
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  created_at: String
  updated_at: String
}
```

### LoginResponse

``` graphql
type LoginResponse {
  message: String!
  token: String
}
```

### Queries
 
- `login`: Logs in a user with their username and password.

``` graphql
login(username: String!, password: String!): LoginResponse!
```
### Mutations

- `signup`: Signs up a new user with their username, email, and password. 

``` graphql
  signup(
    username: String!,
    email: String!,
    password: String!
  ): User!
```