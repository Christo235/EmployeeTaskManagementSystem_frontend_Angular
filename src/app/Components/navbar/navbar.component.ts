import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userLoggedIn = false;
  EmpName: string = '';

  constructor(private route: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && sessionStorage) {
      this.userLoggedIn = sessionStorage.getItem('employeeID') !== null;
      this.EmpName = sessionStorage.getItem('name') || '';
    } 
    else {
      this.userLoggedIn = false;
    }
  }



  onLogin() {
    this.route.navigate(['/loginPage']);
    console.log('Login clicked');


  }


  onLogout() {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.clear();
    }
    this.route.navigate(['/home']);
  }
}
