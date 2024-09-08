import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  CLASS:string[] =["Play","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"]
  
  BLOOD:string[]=["A+","A-","B+","B-","O+","O-","AB+","AB-"]

  validateForm: FormGroup;

  constructor(private service:AdminService,
              private fb:FormBuilder,
              private snackbar:MatSnackBar,
              private router:Router){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required],
      name:["",Validators.required],
      s_Class:["",Validators.required],
      bloodGroup:["",Validators.required],
      fatherName:["",Validators.required],
      motherName:["",Validators.required],
      dob:["",Validators.required],
      address:["",Validators.required]
    })
  }

  postStudent(){
    console.log(this.validateForm.value);
    this.service.postStudent(this.validateForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id!=null){
        this.snackbar.open("Student Saved","Close",{duration:5000});
        this.router.navigateByUrl("/admin/dashboard")
      }
      

    },
  (error)=>{
    if(error.status===400){
      this.snackbar.open("Something went wrong","Close",{duration:5000})
    }
  });
  }
  

}
