import { Injectable } from '@angular/core';
import axios from 'axios';
import { ConfigService } from './config.service';
import { Employee, EmployeeResponseType, EmployeesResponseType, Gender } from './types/responseTypes';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private configService: ConfigService) { }

  async fetchAllEmployees(): Promise<EmployeesResponseType> {
    const url = this.configService.getGraphqlUrl();
    const query = `
      query GetAllEmployees {
        getAllEmployees {
          success
          message
          employees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `
    try {
      const response = await axios.post(url, { query });
      const data: EmployeesResponseType = response.data.data.getAllEmployees;
      return data;
    
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async searchEmployees(searchString: string, searchCategory: string): Promise<EmployeesResponseType> {
    const url = this.configService.getGraphqlUrl();
    const query = `
      query SearchEmployeeByDesignationOrDepartment($designation: String, $department: String) {
        searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
          success
          message
          employees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `
    const variables = searchCategory === 'designation' ? { designation: searchString } : { department: searchString };
    try {
      const response = await axios.post(url, { 
        query,
        variables 
      });
      const data: EmployeesResponseType = response.data.data.searchEmployeeByDesignationOrDepartment;
      return data;
    
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getEmployeeById(id: string): Promise<EmployeeResponseType> {
    const url = this.configService.getGraphqlUrl();
    const query = `
      query SearchEmployeeById($searchEmployeeByIdId: ID!) {
        searchEmployeeById(id: $searchEmployeeByIdId) {
          success
          message
          employee {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `
    try {
      const response = await axios.post(url, { 
        query,
        variables: {
          searchEmployeeByIdId: id
        }
      });
      const data: EmployeeResponseType = response.data.data.searchEmployeeById;
      return data;
    
    } catch (error) {
      console.error('Search employee error:', error);
      throw error;
    }
  }



  async createEmployee(firstName: string, lastName: string, email: string, 
    gender: Gender, department: string, designation: string, dateOfJoining: string,  
    salary: number, employeePhoto: string): Promise<EmployeeResponseType> {
    const url = this.configService.getGraphqlUrl();
    const query = `
      mutation CreateEmployee($firstName: String!, $lastName: String!, $email: String!, $designation: String!, $salary: Float!, $dateOfJoining: String!, $department: String!, $gender: Gender, $employeePhoto: String) {
        createEmployee(first_name: $firstName, last_name: $lastName, email: $email, designation: $designation, salary: $salary, date_of_joining: $dateOfJoining, department: $department, gender: $gender, employee_photo: $employeePhoto) {
          success
          message
          employee {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `;
    try {
      const response = await axios.post(url, { 
        query,
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender,
          designation: designation,
          department: department,
          dateOfJoining: dateOfJoining,
          salary: salary,
          employeePhoto: employeePhoto
        }
      });
      const data: EmployeeResponseType = response.data.data.createEmployee;
      return data;
    } catch (error) {
      console.error('Create employee error:', error);
      throw error;
    }
  }

  async updateEmployeeById(id: string, firstName: string, lastName: string, email: string, 
    gender: Gender, designation: string, department: string, dateOfJoining: string, salary: number,
    employeePhoto: string): Promise<EmployeeResponseType> {

    const url = this.configService.getGraphqlUrl();
    const query = `
      mutation UpdateEmployee($updateEmployeeId: ID!, $firstName: String, $lastName: String, $email: String, $gender: Gender, $designation: String, $salary: Float, $dateOfJoining: String, $department: String, $employeePhoto: String) {
        updateEmployee(id: $updateEmployeeId, first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, designation: $designation, salary: $salary, date_of_joining: $dateOfJoining, department: $department, employee_photo: $employeePhoto) {
          success
          message
          employee {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `
    try {
      const response = await axios.post(url, { 
        query,
        variables: {
          updateEmployeeId: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender,
          designation: designation,
          department: department,
          dateOfJoining: dateOfJoining,
          salary: salary,
          employeePhoto: employeePhoto
        }
      });
      const data: EmployeeResponseType = response.data.data.updateEmployee;
      return data;
    } catch (error) {
      console.error('Update Employee error:', error);
      throw error;
    }
  }

  async deleteEmployeeById(id: string): Promise<EmployeeResponseType> {
    const url = this.configService.getGraphqlUrl();
    const query = `
      mutation DeleteEmployee($deleteEmployeeId: ID!) {
        deleteEmployee(id: $deleteEmployeeId) {
          success
          message
          employee {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `;
    
    try {
      const response = await axios.post(url, { 
        query,
        variables: {
          deleteEmployeeId: id
        }
      });
      const data: EmployeeResponseType = response.data.data.deleteEmployee;
      return data;
    } catch (error) {
      console.error('Delete employee error:', error);
      throw error;
    }
  }
}
