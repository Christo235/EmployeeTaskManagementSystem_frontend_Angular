import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {


  private apiUrl_task = 'https://localhost:7180/api/Tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl_task);
  }

  getTask(id: number): Observable<any> {
    return this.http.get(this.apiUrl_task + '/' + id);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl_task, task);
  }

  updateTask(taskID: any, task: any): Observable<any> {

    return this.http.put(this.apiUrl_task + '/' + taskID, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(this.apiUrl_task + '/' + id);
  }
}

