export interface BaseResponseType {
    success: boolean;
    message: string;
}

export interface LoginResponseType extends BaseResponseType {
    token: string | null;
}

export interface RegisterResponseType extends BaseResponseType {
    user: {
        username: string;
        email: string;
        created_at: string;
    }
}

export interface EmployeesResponseType extends BaseResponseType {
    employees: Employee[];
}

export interface EmployeeResponseType extends BaseResponseType {
    employee: Employee | null;
}

export interface Employee {
    created_at: string;
    date_of_joining: string;
    department: string;
    designation: string;
    email: string;
    employee_photo: string;
    first_name: string;
    last_name: string;
    gender: Gender;
    id: string;
    salary: number;
    updated_at: string;
}

export enum Gender {
    Male,
    Female,
    Other
}

