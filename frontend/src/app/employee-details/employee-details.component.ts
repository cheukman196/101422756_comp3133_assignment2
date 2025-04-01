import { Component, OnInit, signal } from '@angular/core';
import { Employee, EmployeeResponseType, Gender } from '../types/responseTypes';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { enumValidator } from '../validator/enum-validator';
import { dateFormatValidator } from '../validator/date-format-validator';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, DateFormatPipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: Gender.Other,
    designation: '',
    salary: 0,
    date_of_joining: '',
    department: '',
    employee_photo: '',
    created_at: '',
    updated_at: ''
  };
  isEditable: boolean = false;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }
  
  async ngOnInit(): Promise<void> {
    try {
      const employeeId: string | null = this.route.snapshot.paramMap.get('id');
      if (!employeeId) {
        this.router.navigate(['/dashboard']);
        return;
      }

      const response: EmployeeResponseType = await this.employeeService.getEmployeeById(employeeId)
      // return to dashboard if employee not found
      if (!response.employee) {
        this.router.navigate(['/dashboard']);
        return;
      }

      this.employee = response.employee;
      this.employee.date_of_joining = this.formatDate(new Date(Number(this.employee.date_of_joining)))

      this.employeeForm.patchValue({
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        email: this.employee.email,
        gender: this.employee.gender,
        department: this.employee.department,
        designation: this.employee.designation,
        date_of_joining: this.employee.date_of_joining,
        salary: this.employee.salary,
        employee_photo: this.employee.employee_photo
      });

      this.employeeForm.disable()
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

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

  updateEmployee = async() => {
    if (this.employeeForm.valid) {
      const { first_name, last_name, email, gender, department,
        designation, date_of_joining, salary, employee_photo } = this.employeeForm.value;

    try {
        const response: EmployeeResponseType = await this.employeeService.updateEmployeeById(
          this.employee.id, first_name, last_name, email, gender, designation,
          department, date_of_joining, salary, employee_photo
        )
        this.errorMessage.set(response.message);
        
      } catch (error:any) {
        console.error('Update Employee error:', error);
        this.errorMessage.set(error.message || 'Update employee failed. Please try again.');
      }
    } else {
      this.errorMessage.set('Form is invalid. Please check your input.');
    }
  }

  deleteEmployee = async() => {
    try {
      const response: EmployeeResponseType = await this.employeeService.deleteEmployeeById(this.employee.id);
      this.errorMessage.set(response.message);
      if (response.success) {
        this.navigateToDashboard();
      }

    } catch (error:any) {
      console.error('Delete Employee error:', error);
      this.errorMessage.set(error.message || 'Delete employee failed. Please try again.');
    }
  }

  formatDate(date: Date): string {
    const isoString = date.toISOString();
    return isoString.split('T')[0];
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  activateEdit() {
    this.employeeForm.enable()
    this.isEditable = true;
  }

  disableEdit() {
    this.employeeForm.disable()
    this.isEditable = false;
  }


  // 

}