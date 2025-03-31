import { Injectable } from '@angular/core';
import axios from 'axios';
import { ConfigService } from './config.service';
import { BaseResponseType, LoginResponseType, RegisterResponseType } from './types/responseTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private configService: ConfigService) { }

  async login(username: string, password: string): Promise<any> {
    const url = this.configService.getGraphqlUrl();
    const query = `
      query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          message
          success
        } 
      }
    `
    try {
      const response = await axios.post(url, {
        query,
        variables: {
          username,
          password
        }
      });

      const data: LoginResponseType = response.data.data.login;
      const responseToComponent: BaseResponseType = { message: data.message, success: data.success };
      if(data.success && data.token){
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', username);
        // add navigation to home page
      }
      return responseToComponent;
    
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(username: string, email: string, password: string): Promise<any> {  
    const url = this.configService.getGraphqlUrl();
    const query = `
      mutation Mutation($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          success
          message
          user {
            username
            email
            created_at
          }
        }
      }
    `

    try {
      const response = await axios.post(url, {
        query,
        variables: {
          username,
          email,
          password
        }
      });
      const data: RegisterResponseType = response.data.data.signup;
      const responseToComponent: BaseResponseType = { message: data.message, success: data.success };
      // add navigation to home / login page
      return responseToComponent;

    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
}
