import { Injectable } from '@angular/core';
import axios from 'axios';
import { ConfigService } from './config.service';

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
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(username: string, password: string): Promise<any> {  
    const url = this.configService.getGraphqlUrl() + '/register';
    try {
      const response = await axios.post(url, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
}
