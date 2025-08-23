import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, } from '@angular/router';
import { StateManagementAuthService } from '../../Service/state-management-auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
  constructor(
    private route: Router,
    public authService: StateManagementAuthService
  ) { }

  onLogin() {
    this.route.navigate(['/loginPage']);
  }

  onLogout() {
    this.authService.logout();
    this.route.navigate(['/home']);
  }
}
