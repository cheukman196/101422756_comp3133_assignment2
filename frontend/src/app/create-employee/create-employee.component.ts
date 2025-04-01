import { Component, signal } from '@angular/core';
import { Employee, EmployeeResponseType, Gender } from '../types/responseTypes';
import { EmployeeService } from '../employee.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { enumValidator } from '../validator/enum-validator';
import { dateFormatValidator } from '../validator/date-format-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  constructor(private employeeService: EmployeeService, private router: Router) { }
  
  employeeForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required, enumValidator(Gender)]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    date_of_joining: new FormControl('', [Validators.required, dateFormatValidator()]),
    salary: new FormControl(0, [Validators.required, Validators.min(1000)]),
    employee_photo: new FormControl(''),
  });

  errorMessage = signal('');

  createEmployee = async() => {
    if (this.employeeForm.valid) {
      const { first_name, last_name, email, gender, department,
        designation, date_of_joining, salary, employee_photo } = this.employeeForm.value;

    try {
        const response: EmployeeResponseType = await this.employeeService.createEmployee(
          first_name, last_name, email, gender, department,
          designation, date_of_joining, salary, employee_photo
        )
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage.set(response.message || 'Create employee failed. Please try again.');
        }        
      } catch (error:any) {
        console.error('Create Employee error:', error);
        this.errorMessage.set(error.message || 'Create employee failed. Please try again.');
      }
    } else {
      this.errorMessage.set('Form is invalid. Please check your input.');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}