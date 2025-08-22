import { Component, OnInit,  Inject, PLATFORM_ID  } from '@angular/core';
import { AuthService } from '../../Service/aurth-service.service';
import { EmployeeService } from '../../Service/employees-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css'],
  standalone: true
})
export class ProfileComponentComponent implements OnInit {

  user: any = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
   
    const userId = sessionStorage.getItem('employeeID');
    if (userId) {

      const id = Number(userId);
      this.employeeService.getEmployeeById(id).subscribe(res => this.user = res);
    }
  }
}
