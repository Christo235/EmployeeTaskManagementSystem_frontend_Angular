import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7180/api/Employees'; 

  constructor(private http: HttpClient) { }


  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.apiUrl+'/'+id);
  }

  createEmployee(emp: any): Observable<any> {
    return this.http.post(this.apiUrl, emp);
  }


  updateEmployee(id: number, emp: any): Observable<any> {
    
    return this.http.put(this.apiUrl+'/'+id, emp);
  }


  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }
}
