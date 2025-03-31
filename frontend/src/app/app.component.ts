import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) { }

  logout(): void {
    if (localStorage) {
      localStorage.removeItem('token');
    }
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}