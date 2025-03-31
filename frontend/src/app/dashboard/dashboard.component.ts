import { Component, OnInit } from '@angular/core';
import { Employee } from '../types/responseTypes';
import { EmployeeService } from '../employee.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
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

  navigateToEmployeeDetails(employeeId: string) {
    this.router.navigate(['/employee', employeeId]);
  }

}
