import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../../Service/task-service.service';
import { EmployeeService } from '../../Service/employees-service.service';



export interface Employee {
  employeeID: number;
  role: string;
  name: string;
  email: string;
  department: string;
  joining_Date: string;
}

export interface Task {
  taskID: number;
  title: string;
  description: string;
  assignedTo_EmployeeId: number;
  taskStatus: string;
  dueDate: string;
  employee?: Employee;
}


@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {

  taskForm: FormGroup = new FormGroup({});
  statuses = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Completed', value: 'Completed' }
  ];


  isEditMode = false;
  taskID: number | null = null;
  tasks: Task[] = [];
  employees: Employee[] = [];
  asiginEmployeeId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskServiceService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignedTo_EmployeeId: ['', Validators.required],
      taskStatus: ['', Validators.required],
      dueDate: ['', Validators.required],
      employee: this.fb.group({
        employeeID: [''],
        role: [''],
        name: [''],
        email: [''],
        department: [''],
        joining_Date: ['']
      })
    });

    this.getAllEmployees();
    this.getAllTasks();
  }


  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const rawDate = this.taskForm.value.dueDate;
    const parsedDate = new Date(rawDate);
    if (isNaN(parsedDate.getTime())) {
      alert("Invalid date format");
      return;
    }

    const taskPayload: Task = {
      taskID: this.isEditMode && this.taskID ? this.taskID : 0,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      assignedTo_EmployeeId: Number(this.taskForm.value.assignedTo_EmployeeId),
      taskStatus: this.taskForm.value.taskStatus,
      dueDate: parsedDate.toISOString(),
      employee: this.taskForm.value.employee
    };


    const request = this.isEditMode
      ? this.taskService.updateTask(this.taskID!, taskPayload)
      : this.taskService.createTask(taskPayload);


    request.subscribe({
      next: () => {
        console.log(this.isEditMode ? "Task updated" : "Task created", taskPayload);
        this.resetForm();
        this.getAllTasks();
      },
      error: (err) => {
        console.error("Save failed", err);
        alert("Save failed");
      }
    });
  }

  onAssigneeChange(event: Event) {
    const empId = Number((event.target as HTMLSelectElement).value);
    const selected = this.employees.find(e => e.employeeID === empId);
    if (selected) {
      this.taskForm.patchValue({ employee: selected });
    }
  }




  getAllEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: res => {
        this.employees = res;
        console.log("Employees loaded:", this.employees);
      },
      error: err => console.error("Failed to load employees", err)
    });
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe({
      next: res => {
        this.tasks = res.map((t: Task) => ({
          ...t,
          employee: t.employee || this.employees.find(e => e.employeeID === t.assignedTo_EmployeeId)
        }));
        console.log("Tasks loaded:", this.tasks);
      },
      error: err => console.error("Failed to load tasks", err)
    });
  }




  onEdit(task: Task): void {
    this.isEditMode = true;
    this.taskID = task.taskID;


    const formattedDate = task.dueDate ? task.dueDate.split("T")[0] : '';

    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      assignedTo_EmployeeId: String(task.assignedTo_EmployeeId),
      taskStatus: task.taskStatus,
      dueDate: formattedDate,
      employee: task.employee ?? {}
    });
  }




  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.taskID !== id);
        console.log("Task deleted:", id);

      },
      error: err => {
        console.error("Delete failed", err);

      }
    });
  }

  private resetForm(): void {
    this.taskForm.reset();
    this.isEditMode = false;
    this.taskID = null;
  }
}

