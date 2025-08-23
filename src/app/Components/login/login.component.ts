import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/aurth-service.service';
import { StateManagementAuthService } from '../../Service/state-management-auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private stateAuth: StateManagementAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);


          this.stateAuth.setAuth(
            response.rp_Token ?? '',
            response.rp_Role ?? '',
            response.rp_Name ?? '',
            response.rp_EmployeeID.toString() ?? ''
          );


          this.router.navigate(['/dashboard_Page/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert(error.error?.rp_Message || "Login failed. Please try again.");
        }
      });
    } else {
      console.error('Login form is invalid');
    }
  }
}
