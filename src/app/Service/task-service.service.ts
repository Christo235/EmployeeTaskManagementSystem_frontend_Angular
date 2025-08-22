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

  updateTask(task: any, id :any): Observable<any> {
    console.log('Updating task with ID:', 'and data:', task);
    return this.http.put(this.apiUrl_task + '/' + id, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(this.apiUrl_task + '/' + id);
  }
}
