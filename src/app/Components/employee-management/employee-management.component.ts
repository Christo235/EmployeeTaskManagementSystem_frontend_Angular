import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeService } from '../../Service/employees-service.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css'],

})
export class EmployeeManagementComponent implements OnInit {

 
  employeeForm: FormGroup = new FormGroup({});
  employees: any[] = [];
  roles: string[] = ['Admin', 'Manager', 'Developer', 'TeamLead'];
  departments: string[] = ['HR', 'IT', 'Finance', 'Sales', 'Support'];
  editMode: boolean = false;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,

  ) { }

  ngOnInit(): void {
    this.loadEmployees();

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      joining_Date: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => this.employees = res);
  }

  onSubmit() {
    if (this.employeeForm.invalid || !this.editMode || this.editId == null) return;

    const formValue = this.employeeForm.value;


    const employeeData = {
      ...formValue,
      joining_Date: formValue.joining_Date.toString(),

    };

    this.employeeService.updateEmployee(this.editId, employeeData).subscribe(() => {
      this.loadEmployees();
      this.resetForm();
    });
  }



  editEmployee(emp: any) {
    this.editMode = true;
    this.editId = emp.employeeID!;
    const joiningDate = emp.joining_Date ? new Date(emp.joining_Date).toISOString().split('T')[0] : '';
    this.employeeForm.patchValue({
      ...emp,
      joining_Date: joiningDate
    });
  }



  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.editMode = false;
    this.editId = null;
  }

}
