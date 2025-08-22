import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Service/employees-service.service';
import { TaskServiceService } from '../../Service/task-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  tasks: any[] = [];
  filteredTasks: any[] = [];
  employees: any[] = [];

  selectedEmployee: any = '';
  selectedStatus: any = '';

  pendingCount = 0;
  inProgressCount = 0;
  completedCount = 0;

  constructor(private taskService: TaskServiceService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadEmployees();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      this.filteredTasks = res;
      this.calculateSummary();
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  calculateSummary() {
    this.pendingCount = this.tasks.filter(t => t.taskStatus === 'Pending').length;
    this.inProgressCount = this.tasks.filter(t => t.taskStatus === 'InProgress').length;
    this.completedCount = this.tasks.filter(t => t.taskStatus === 'Completed').length;
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task => {
      return (!this.selectedEmployee || task.assignedTo_EmployeeId == this.selectedEmployee)
          && (!this.selectedStatus || task.taskStatus === this.selectedStatus);
    });
  }

  getEmployeeName(empId: number) {
    const emp = this.employees.find(e => e.EmployeeID === empId);
    return emp ? emp.Name : '';
  }
}
