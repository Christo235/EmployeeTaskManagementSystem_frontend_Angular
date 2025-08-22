import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TaskManagementComponent } from './Components/task-management/task-management.component';
import { EmployeeManagementComponent } from './Components/employee-management/employee-management.component';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { ProfileComponentComponent } from './Components/profile-component/profile-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'loginPage', component: LoginComponent },
    { path: 'registerPage', component: RegisterComponent },
    {
        path: 'dashboard_Page', component: DashboardPageComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'taskManagement', component: TaskManagementComponent },
            { path: 'employeeManagement', component: EmployeeManagementComponent },
            { path: 'profile', component: ProfileComponentComponent } 
        ]
    },
];