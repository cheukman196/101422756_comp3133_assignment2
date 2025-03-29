const createEmployeeValidationSchema = {
    first_name: {
        isString: {
            errorMessage: 'First name should be a string.'
        },
        notEmpty: {
            errorMessage: 'First name should not be empty.'
        }
    },

    last_name: {
        isString: {
            errorMessage: 'Last name should be a string.'
        },
        notEmpty: {
            errorMessage: 'Last name should not be empty.'
        }
    },

    email: {
        isString: {
            errorMessage: 'Email should be a string.'
        },
        isEmail: {
            errorMessage: 'Email not in proper format.'
        },
        notEmpty: {
            errorMessage: 'Email should not be empty.'
        }
    },

    gender: {
        optional: true,
        isString: {
            errorMessage: 'Designation should be a string.'
        },
        isIn:{
            options:[['Male', 'Female', 'Other']],
            errorMessage: 'Gender must be Male, Female, or Other.'
        }
    },

    designation: {
        isString: {
            errorMessage: 'Designation should be a string.'
        },
        notEmpty: {
            errorMessage: 'Designation should not be empty.'
        }
    },

    salary: {
        isFloat: {
            options: { gt: 1000 },  
            errorMessage: 'Salary must be greater than 1000.' 
        },
    },

    date_of_joining: {
        isDate: {
            errorMessage: 'Date of Joining should be a valid date format.'
        }
    },

    department: {
        isString: {
            errorMessage: 'Deparment should be a string.'
        },
        notEmpty: {
            errorMessage: 'Department should not be empty.'
        }
    },

    employee_photo: {
        optional: true,
        isString: {
            errorMessage: 'Deparment should be a string.'
        },
    },


};

module.exports = createEmployeeValidationSchema;