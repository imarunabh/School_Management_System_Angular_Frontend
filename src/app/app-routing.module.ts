import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './components/dashboards/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/dashboards/student-dashboard/student-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { teacherGuard } from './guards/teacher.guard';
import { studentGuard } from './guards/student.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { AddStudentComponent } from './components/admin/add-student/add-student.component';
import { GetAllStudentsComponent } from './components/admin/get-all-students/get-all-students.component';
import { ZoomImageComponent } from './components/admin/zoom-image/zoom-image.component';

const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[noAuthGuard]},
  {path:'admin/dashboard',component:AdminDashboardComponent,canActivate:[adminGuard]},
  {path:'teacher/dashboard',component:TeacherDashboardComponent,canActivate:[teacherGuard]},
  {path:'student/dashboard',component:StudentDashboardComponent,canActivate:[studentGuard]},
  {path:'admin/add-student',component:AddStudentComponent,canActivate:[adminGuard]},
  {path:'admin/get-all-students',component:GetAllStudentsComponent,canActivate:[adminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
