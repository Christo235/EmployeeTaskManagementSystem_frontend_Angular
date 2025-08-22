import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/aurth-service.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          sessionStorage.setItem('token', response.token ?? '');
          sessionStorage.setItem('name', response.name ?? '');
          sessionStorage.setItem('employeeID', response.employeeID?.toString() ?? '');
          sessionStorage.setItem('message', response.message ?? '');
          alert(response.message);
           this.router.navigate(['/dashboard_Page/dashboard']);

        },
        error: (error) => {
          console.error('Login failed', error);
        },
        complete: () => { }

      });
    }
    else {
      console.error('Login form is invalid');
    }

  }

}
