import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl_Auth = 'https://localhost:7180/api/Auth';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl_Auth}/Register`, userData);
  }


  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl_Auth}/Login`, loginData);
  }



}
