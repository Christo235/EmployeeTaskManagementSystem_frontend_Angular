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
  onHold = 0;

  summaryCards = [
    { title: 'Pending', count: this.pendingCount, textClass: 'text-warning' },
    { title: 'In Progress', count: this.inProgressCount, textClass: 'text-primary' },
    { title: 'On Hold', count: this.onHold, textClass: 'text-secondary' },
    { title: 'Completed', count: this.completedCount, textClass: 'text-success' }
  ];

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
    this.inProgressCount = this.tasks.filter(t => t.taskStatus === 'In Progress').length;
    this.completedCount = this.tasks.filter(t => t.taskStatus === 'Completed').length;
    this.onHold = this.tasks.filter(t => t.taskStatus === 'On Hold').length;


    this.summaryCards = [
      { title: 'Pending', count: this.pendingCount, textClass: 'text-warning' },
      { title: 'In Progress', count: this.inProgressCount, textClass: 'text-primary' },
      { title: 'On Hold', count: this.onHold, textClass: 'text-secondary' },
      { title: 'Completed', count: this.completedCount, textClass: 'text-success' }
    ];
  }


  getEmployeeName(empId: number) {
    const emp = this.employees.find(e => e.employeeID === empId);
    return emp ? emp.name : '';
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task => {
      return (!this.selectedEmployee || task.assignedTo_EmployeeId == this.selectedEmployee)
        && (!this.selectedStatus || task.taskStatus === this.selectedStatus);
    });
  }

}
