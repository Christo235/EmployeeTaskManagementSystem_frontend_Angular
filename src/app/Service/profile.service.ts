import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StateManagementAuthService } from './state-management-auth.service';
export interface ProfileResponse {
  rp_EmployeeID: number;
  rp_Name: string;
  rp_Email: string;
  rp_Department: string;
  rp_Role: string;
  rp_Joining_Date: string;
}

export interface ProfileRequest {
  employeeID: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7180/api/Profile/GetProfile';

  constructor(
    private http: HttpClient,
    private stateAuth: StateManagementAuthService
  ) { }

  getProfile(): Observable<ProfileResponse> {
    const employeeID = this.stateAuth.employeeID();

    if (employeeID === null) {
      return throwError(() => new Error("No EmployeeID found in state. Please login."));
    }

    const profileDto: ProfileRequest = { employeeID };
    return this.http.post<ProfileResponse>(this.apiUrl, profileDto);
  }

}
