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

  async updateEmployeeById(id: string, firstName: String, lastName: String, email: String, 
    gender: Gender, designation: String, department: string, salary: number, dateOfJoining: string, 
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
          first_Name: firstName,
          last_Name: lastName,
          email: email,
          gender: gender,
          designation: designation,
          department: department,
          date_of_joining: dateOfJoining,
          salary: salary,
          employee_photo: employeePhoto
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
