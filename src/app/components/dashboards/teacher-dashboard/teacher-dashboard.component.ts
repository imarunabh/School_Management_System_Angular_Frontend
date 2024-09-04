import { Component } from '@angular/core';
import { TeacherService } from '../../../teacher-service/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {

  teacher:any;

  constructor(private service:TeacherService){}

  ngOnInit(){
    this.getTeacherById();
  }

  getTeacherById(){
    this.service.getTeacherById().subscribe((res)=>{
      // console.log(res);
      this.teacher=res;
      console.log(this.teacher);
    });
    
  }

}
