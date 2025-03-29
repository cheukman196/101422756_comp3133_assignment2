const Employee = require('../../model/employee')

const resolvers = {
    Query: {
         // EMPLOYEE
        getAllEmployees: async () => {
            const employees = await Employee.find();
            return employees;
        },

        searchEmployeeById: async (_, {id}) => {
            const employee = await Employee.findOne({ id: id })
            return employee;
        },

        searchEmployeeByDesignationOrDepartment: async (_, {designation, department}) => {
            if(!designation && !department)
                throw new Error('Must provide designation or department')
            
            const condition = {}
            if(designation) condition.designation = designation;
            if(department) condition.department = department; 

            const employees = await Employee.find(condition)
            return employees;
        }
    },

    Mutation: {
        // EMPLOYEE
        createEmployee: async (_, {
            first_name, last_name, email, gender, designation, 
            salary, date_of_joining, department, employee_photo
        }) => {
            const newEmployee = new Employee({
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                designation: designation,
                salary: salary,
                date_of_joining: date_of_joining,
                department: department,
                employee_photo: employee_photo
            });

            await newEmployee.save();
            return newEmployee;
        },

        updateEmployee: async (_, {
            id, first_name, last_name, email, gender, designation, 
            department, salary, date_of_joining, employee_photo
        }) => {
            const updatedEmployee = await Employee.findOneAndUpdate(
                {_id: id},  
                // $set indicates which fields to update
                { $set:
                    {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        gender: gender,
                        designation: designation,
                        salary: salary,
                        date_of_joining: date_of_joining,
                        department: department,
                        employee_photo: employee_photo,
                        updated_at: Date.now() // update this field every time
                    }
                },
                {
                    runValidators: true, // run mongoose validation
                    new: true // return updated object
                } 
    
            );
            return updatedEmployee;
        },

        deleteEmployee: async (_, {id}) => {
            const deletedEmployee = await Employee.findOneAndDelete({_id: id})
            // findOneAndDelete returns doc if deleted, returns null if not found
            return deletedEmployee != null // success = return true, fail = return false
        }
    }

}

module.exports = resolvers;