import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private userService: UserService) {}

  loginForm!: WritableSignal<FormGroup>;

  ngOnInit() {
    this.loginForm = signal(this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    }));
  }
  errorMessage = signal('');
  

  login = async() => {
    if (this.loginForm().valid) {
      const { username, password } = this.loginForm().value;      
      try {
        const response: any = await this.userService.login(username, password)
        alert(`Login response: ${JSON.stringify(response.data)}`);
        if(!response.data.login.token) {
          this.errorMessage.set(response.data.login.message || 'Login failed. Please try again.');
          return;
        }

      } catch (error:any) {
        console.error('Login error:', error);
        this.errorMessage.set(error.message || 'Login failed. Please try again.');
      }

    } else {
      this.errorMessage.set('Please enter both username and password.');
    }
  }

}
