import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { BaseResponseType } from '../types/responseTypes';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage = signal('');

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  
  login = async() => {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;      
      try {
        const response: BaseResponseType = await this.userService.login(username, password)
        if(!response.success) {
          this.errorMessage.set(response.message || 'Login failed. Please try again.');
          return 
        }
        this.router.navigate(['/dashboard']);
      } catch (error:any) {
        console.error('Login error:', error);
        this.errorMessage.set(error.message || 'Login failed. Please try again.');
      }

    } else {
      this.errorMessage.set('Please enter both username and password.');
    }
  }

  navigateToSignup() {
    this.router.navigate(['/dashboard']);
  }
}
