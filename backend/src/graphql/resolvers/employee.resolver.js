const Employee = require('../../model/employee')
const { isValidObjectId } = require('mongoose')

const resolvers = {
    Query: {
         // EMPLOYEE
        getAllEmployees: async () => {
            const employees = await Employee.find();
            if (!employees || employees.length === 0)
                return {employees: employees, success: false, message: "No employees found"};
            return {employees: employees, success: true, message: "All employees fetched successfully"};
        },

        searchEmployeeById: async (_, {id}) => {
            if(!id || !isValidObjectId(id))
                return {employee: null, success: false, message: "Invalid or missing employee ID"};

            const employee = await Employee.findOne({ _id: id })
            if(!employee)
                return {employee: null, success: false, message: "Employee not found"};

            return {employee: employee, success: true, message: "Employee fetched successfully"};
        },

        searchEmployeeByDesignationOrDepartment: async (_, {designation, department}) => {
            if(!designation && !department)
                throw new Error('Must provide designation or department')
            
            const condition = {}
            if(designation) condition.designation = designation;
            if(department) condition.department = department; 

            const employees = await Employee.find(condition)
            if (!employees || employees.length === 0)
                return {employees: employees, success: false, message: "No matching employees found"};
            return {employees: employees, success: true, message: "Searched fetched successfully"};
        }
    },

    Mutation: {
        // EMPLOYEE
        createEmployee: async (_, {
            first_name, last_name, email, gender, designation, 
            salary, date_of_joining, department, employee_photo
        }) => {
            const existingEmployee = await Employee.findOne({ email: email });
            if (existingEmployee) return { success: false, message: "Email has already been taken", employee: null };

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
            return { success: true, message: "Employee created successfully", employee: newEmployee };
        },

        updateEmployee: async (_, {
            id, first_name, last_name, email, gender, designation, 
            department, salary, date_of_joining, employee_photo
        }) => {
            if(!id || !isValidObjectId(id))
                return {employee: null, success: false, message: "Invalid or missing employee ID"};

            const existingEmployee = await Employee.findOne({ email: email });
            if (existingEmployee) return { success: false, message: "Email has already been taken", employee: null };

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

            if(!updatedEmployee) return { success: false, message: "Employee not found", employee: null };
            return { 
                success: true, 
                message: `Employee updated successfully`,
                employee: updatedEmployee
            };
        },

        deleteEmployee: async (_, {id}) => {
            if(!id || !isValidObjectId(id))
                return {employee: null, success: false, message: "Invalid or missing employee ID"};
            
            const deletedEmployee = await Employee.findOneAndDelete({_id: id})
            // findOneAndDelete returns doc if deleted, returns null if not found

            if(!deletedEmployee) return { success: false, message: "Employee not found", employee: null };
            return { 
                success: true, 
                message: `Employee deleted successfully`, 
                employee: deletedEmployee 
            }
        }
    }

}

module.exports = resolvers;