const { validationResult, matchedData, checkSchema, oneOf, body } = require('express-validator');
const createEmployeeValidationSchema = require("../utils/createEmployeeValidationSchema.js");
const updateEmployeeValidationSchema = require("../utils/updateEmployeeValidationSchema.js");

const express = require('express');
const router = express.Router();
const Employee = require('../model/employee.js');
const { isValidObjectId } = require('mongoose');

// route: GET /api/v1/emp/employees
// get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        // on success
        res.status(201).send(employees);

    } catch (err) {

        res.status(500).send({ 
            message: "Employee retrieval failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: POST /api/v1/emp/employees
// create employee
router.post('/employees', 
    checkSchema(createEmployeeValidationSchema),
    async (req, res) => {
    try {
        // check validation
        const expressValidationResult = validationResult(req);
        // if any error, return 400 and error msg
        if(!expressValidationResult.isEmpty()){
            return res.status(400).send({
                message: "Oops, you've entered some invalid fields",
                error: expressValidationResult.array()});
        }

        // use validated data to create employee
        const data = matchedData(req);
        const { first_name, last_name, email, position, 
            salary, date_of_joining, department } = data;
        
        const newEmployee = new Employee({
            first_name: first_name,
            last_name: last_name,
            email: email,
            position: position,
            salary: salary,
            date_of_joining: date_of_joining,
            department: department
        });

        await newEmployee.save(); // persist to db

        // on success
        res.status(201).json({
            message: "Employee created successfully", 
            first_name: newEmployee.first_name,
            last_name: newEmployee.last_name,
            id: newEmployee._id
        });
        
    } catch (err) {
        res.status(500).send({ 
            message: "Employee creation failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: GET /api/v1/emp/employees/{empID}
// get specific employee by id
router.get('/employees/:empID', async (req, res) => {
    try {
        // check id format matches mongodb _id
        const empID = req.params.empID;
        if(!isValidObjectId(empID))
            return res.status(400).send({status: false, message: `Employee ID is invalid.`});
        
        // query for employee
        const employee = await Employee.findOne({_id: empID});
        if(employee)
            return res.status(200).send(employee);
        else
            return res.status(404).send({status: false, message: `Employee with given id cannot be found.`});

    } catch (err) {
        res.status(500).send({ 
            message: "Employee retrieval failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: PUT /api/v1/emp/employees/eid
// delete employee by id
router.put('/employees/:eid', 
    checkSchema(updateEmployeeValidationSchema),
    async (req, res) => {
    try {
        // check if id matches mongodb _id format
        if(!isValidObjectId(req.params.eid))
            return res.status(400).send({status: false, message: `Employee ID is invalid.`});
        
        // check express-validator results, exit if any errors
        const expressValidationResult = validationResult(req);
        if(!expressValidationResult.isEmpty()){
            return res.status(400).send({
                message: "Oops, you've entered some invalid fields",
                error: expressValidationResult.array()});
        }

        // get validated data
        const data = matchedData(req);
        const { first_name, last_name, email, position, 
            salary, date_of_joining, department } = data;
        
        const employee = await Employee.findOne({_id: req.params.eid});
        if(!employee){
            return res.status(404).send({status: false, message: `Employee with given id cannot be found.`});
        }
   
        const updatedEmployee = await Employee.findOneAndUpdate(
            {_id: req.params.eid},  
            // $set indicates which fields to update
            { $set:
                {
                    // we could use '...req.body' here
                    // but created_at and updated_at shouldn't be updateable
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    position: position,
                    salary: salary,
                    date_of_joining: date_of_joining,
                    department: department,
                    updated_at: Date.now() // update this field every time
                }
            },
            // return object post-change instead of pre- (by default)
            {new: true}

        );
        return res.status(200).send({status: true, message: `Employee '${updatedEmployee._id}' updated successfully `});
     

    } catch (err) {

        res.status(500).send({ 
            message: "Employee update failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});


// route: DELETE /api/v1/emp/employees?eid=xxx
// delete employee by id
router.delete('/employees', async (req, res) => {
    try {
        // check format of id matches mongodb _id
        if(!isValidObjectId(req.query.eid))
            return res.status(400).send({status: false, message: `Employee ID is invalid.`});

        // avoid error from findOneAndDelete() by first checking if employee exists 
        const employee = await Employee.findOne({_id: req.query.eid});
        if(!employee){
            return res.status(404).send({status: false, message: `Employee with given id cannot be found.`});
        } else {
            // delete and return message
            const deletedEmployee = await Employee.findOneAndDelete({_id: req.query.eid}); // delete employee
            return res.status(204).send({status: true, message: `Employee '${deletedEmployee._id}' deleted successfully `});
        }

    } catch (err) {
        res.status(500).send({ 
            message: "Employee delete failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
});

module.exports = router;
