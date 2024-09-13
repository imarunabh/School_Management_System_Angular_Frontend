import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin-service/admin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ZoomImageComponent } from '../zoom-image/zoom-image.component';

@Component({
  selector: 'app-get-all-students',
  templateUrl: './get-all-students.component.html',
  styleUrl: './get-all-students.component.css'
})
export class GetAllStudentsComponent implements OnInit{

  students:any;

  constructor(private adminService:AdminService,
              private router:Router,
              private dialogRef:MatDialog
  ){}
  ngOnInit(){
    this.getAllStudents();
  }

  getAllStudents(){
    this.adminService.getAllStudents().subscribe((res)=>{
      // console.log(res);
      this.students=res;
      // console.log(this.students);
      for(let student of this.students){
        console.log(student.image);
      }
    });
  }
  zoom(url:string){
    this.adminService.setImage(url)
    this.dialogRef.open(ZoomImageComponent);
  }

}
