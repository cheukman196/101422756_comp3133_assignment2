import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { BaseResponseType } from '../types/responseTypes';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  errorMessage = signal('');
  

  signup = async() => {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value; 

    try {
        const response: BaseResponseType = await this.userService.register(username, email, password)
        this.errorMessage.set(response.message);
        
      } catch (error:any) {
        console.error('Signup error:', error);
        this.errorMessage.set(error.message || 'Signup failed. Please try again.');
      }
    } else {
      this.errorMessage.set('Form is invalid. Please check your input.');
    }
  }

  get username() {
    return this.signupForm.get('username')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
