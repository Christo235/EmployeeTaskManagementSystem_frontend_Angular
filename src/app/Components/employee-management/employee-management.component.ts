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

  editMode: boolean = false;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService,
   
  ) { }

  ngOnInit(): void {
    this.loadEmployees();

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required, Validators.minLength(2)]],
      joining_Date: ['', Validators.required],
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => this.employees = res);
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    const employeeData: any = this.employeeForm.value;

    if (this.editMode && this.editId != null) {
      this.employeeService.updateEmployee(this.editId, employeeData).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
      });
    }
  }

  editEmployee(emp: any) {
    this.editMode = true;
    this.editId = emp.employeeID!;
    this.employeeForm.patchValue(emp);
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
