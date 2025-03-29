const mongoose = require('mongoose');

// validation in express validator /utils
const EmployeeSchema = new mongoose.Schema({
    "first_name": { type: String, required: true },
    "last_name": { type: String, required: true },
    "email": { type: String, required: true, unique: true },
    "gender": { type: String, enum: ["Male", "Female", "Other"] },
    "designation": { type: String, required: true, default: "N/A" },
    "salary": { type: Number, required: true, default: 0, validate: (s)=>{s>1000;} },
    "date_of_joining": { type: Date, required: true, default: Date.now },
    "department": { type: String, required: true, default: "N/A" },
    "employee_photo": { type: String, default: "N/A" },
    "created_at": { type: Date, default: Date.now },
    "updated_at": { type: Date, default: Date.now }
})

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

