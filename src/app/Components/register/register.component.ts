import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/aurth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  signUpForm: FormGroup = new FormGroup({});


  roles = ['Admin', 'Manager', 'Team Lead', 'Developer'];
  departments: string[] = ['HR', 'IT', 'Finance', 'Sales', 'Support'];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      Name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      JoiningDate: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      Role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;


      const userData = {
        Name: formValue.Name,
        Email: formValue.email,
        Password: formValue.password,
        Role: formValue.Role,
        Department: formValue.Department,
        Joining_Date: new Date(formValue.JoiningDate).toISOString().split('T')[0]
      };

      console.log("Sending userData to backend:", userData);

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Registration successful! Please log in.');
          this.router.navigate(['/loginPage']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert(error.error?.rp_Message || "Registration failed. Please try again.");
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
