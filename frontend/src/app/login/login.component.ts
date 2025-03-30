import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { BaseResponseType } from '../types/responseTypes';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

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
        }
      } catch (error:any) {
        console.error('Login error:', error);
        this.errorMessage.set(error.message || 'Login failed. Please try again.');
      }

    } else {
      this.errorMessage.set('Please enter both username and password.');
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
