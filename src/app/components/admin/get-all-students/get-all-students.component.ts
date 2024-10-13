import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin-service/admin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ZoomImageComponent } from '../zoom-image/zoom-image.component';
import { StudentService } from '../../../student-service/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-get-all-students',
  templateUrl: './get-all-students.component.html',
  styleUrl: './get-all-students.component.css'
})
export class GetAllStudentsComponent implements OnInit{

  students:any;
  attendanceForm: FormGroup;

  constructor(private adminService:AdminService,
              private router:Router,
              private dialogRef:MatDialog,
              private studentService:StudentService,
              private fb:FormBuilder,
              private snackbar:MatSnackBar

  ){}
  ngOnInit(){
    this.getAllStudents();
    this.attendanceForm = this.fb.group({
      attendance_date:[new Date,[Validators.required]]
    })
    // console.log(this.attendanceForm.value);
  }

  getAllStudents(){
    this.adminService.getAllStudents().subscribe((res)=>{
      // console.log(res);
      this.students=res;
      // console.log(this.students);
      // for(let student of this.students){
      //   console.log(student.image);
      // }
    });
  }
  zoom(url:string){
    this.adminService.setImage(url)
    this.dialogRef.open(ZoomImageComponent);
  }

  setStudentEmail(email:string){
    this.studentService.setEmail(email);
  }

  

  markAttendance(email:string){
    this.adminService.markTodaysAttendance(email).subscribe((res)=>{
      // console.log(res);
    });

  }

}
