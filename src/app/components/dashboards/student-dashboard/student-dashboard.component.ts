import { Component } from '@angular/core';
import { StudentService } from '../../../student-service/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {

  student:any;

  constructor(private service:StudentService) {}

  ngOnInit(){
    this.getStudentById();
  }

  getStudentById(){
    this.service.getStudentById().subscribe((res)=>{
      console.log(res);
      this.student = res;
  
    })
    }

}
