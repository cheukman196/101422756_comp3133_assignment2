import { Component, OnInit } from '@angular/core';
import { Employee, EmployeesResponseType } from '../types/responseTypes';
import { EmployeeService } from '../employee.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];

  searchForm: FormGroup = new FormGroup({
    searchString: new FormControl('', [Validators.required]),
    searchCategory: new FormControl('department', [Validators.required]),
  });
  
  constructor(private employeeService: EmployeeService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.employeeService.fetchAllEmployees()
      if (!response.success) {
        return;
      }
      this.employees = response.employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  search = async() => {
    if (this.searchForm.valid) {
      const { searchString, searchCategory } = this.searchForm.value;
      try {
        const response: EmployeesResponseType = await this.employeeService.searchEmployees(searchString, searchCategory)
        if (!response.success) {
          return;
        }
        this.employees = response.employees;
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      console.error('Form is invalid. Please check your input.');
    }
  }

  resetSearch = async() => {
    this.searchForm.reset();
    this.searchForm.get('searchCategory')?.setValue('designation');

    try {
      const response = await this.employeeService.fetchAllEmployees()
      if (!response.success) {
        return;
      }
      this.employees = response.employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  navigateToEmployeeDetails(employeeId: string) {
    this.router.navigate(['/employee', employeeId]);
  }

  navigateToCreateEmployee() {
    this.router.navigate(['/create']);
  }

}
