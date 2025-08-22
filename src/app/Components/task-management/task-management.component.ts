import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../../Service/task-service.service';
import { EmployeeService } from '../../Service/employees-service.service';



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
    { label: 'Pending', value: 0 },
    { label: 'In Progress', value: 1 },
    { label: 'On Hold', value: 2 },
    { label: 'Completed', value: 3 }
  ];



  isEditMode = false;
  taskID: number | null = null;

  tasks: any[] = [];
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskServiceService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskID: [''],
      title: ['', Validators.required],
      description: [''],
      assignedTo_EmployeeId: ['', Validators.required],
      taskStatus: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    this.getAllTasks();
    this.getAllEmployees();
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log('Tasks:', this.tasks);
      },
      error: (err) => console.error(err)
    });
  }

  getAllEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        console.log("Employees loaded:", this.employees);
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
  if (this.taskForm.invalid) return;

  const payload = {
    title: this.taskForm.value.title,
    description: this.taskForm.value.description,
    assignedTo_EmployeeId: Number(this.taskForm.value.assignedTo_EmployeeId), // ✅ force int
    taskStatus: Number(this.taskForm.value.taskStatus), // ✅ force enum/int
    dueDate: this.taskForm.value.dueDate
  };

  console.log("Submitting payload:", payload);

  if (this.isEditMode) {
    this.taskService.updateTask(this.taskID, payload).subscribe({
      next: res => console.log("Update success", res),
      error: err => console.error("Update failed", err)
    });
  } else {
    this.taskService.createTask(payload).subscribe({
      next: res => console.log("Create success", res),
      error: err => console.error("Create failed", err)
    });
  }
}


  onEdit(task: any) {
    this.isEditMode = true;
    this.taskID = task.taskID;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      assignedTo_EmployeeId: task.assignedTo_EmployeeId,
      taskStatus: task.taskStatus,
      dueDate: task.dueDate
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks = this.tasks.filter(t => t.taskID !== id),
      error: (err) => console.error(err)
    });
  }

  private resetForm() {
    this.taskForm.reset();
    this.isEditMode = false;
    this.taskID = null;
  }


}
