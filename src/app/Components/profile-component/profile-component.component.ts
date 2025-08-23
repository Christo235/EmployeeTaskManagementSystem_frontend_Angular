import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateManagementAuthService } from '../../Service/state-management-auth.service';
import { ProfileService } from '../../Service/profile.service';

export interface Employee {
  rp_EmployeeID: number;
  rp_Name: string;
  rp_Email: string;
  rp_Department: string;
  rp_Role: string;
  rp_Joining_Date: string;
}


@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css'],
  standalone: true
})
export class ProfileComponentComponent implements OnInit {

  user: Employee | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: StateManagementAuthService
  ) { }

  ngOnInit(): void {
    const empId = this.authService.employeeID();

    if (!empId) {
      console.warn('No EmployeeID found in state.');
      return;
    }

    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.user = {
          rp_EmployeeID: res.rp_EmployeeID,
          rp_Name: res.rp_Name,
          rp_Email: res.rp_Email,
          rp_Department: res.rp_Department,
          rp_Role: res.rp_Role,
          rp_Joining_Date: res.rp_Joining_Date
        };
      },
      error: (err) => console.error('Error loading profile:', err)
    });


  }
}
