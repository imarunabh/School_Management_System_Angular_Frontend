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

  CLASS:string[] =["Play","1","2","3","4","5","6","7","8","9","10"]
  
  BLOOD:string[]=["A+","A-","B+","B-","O+","O-","AB+","AB-"]

  validateForm: FormGroup;
  image:any;

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
      address:["",Validators.required],
    })
  }


  postStudent(){
    const fileInput = document.getElementsByName("image")[0] as HTMLInputElement;
    this.image = fileInput.files?.[0];
    // console.log(this.image);
    console.log(this.validateForm.value,this.image);
    this.service.postStudent(this.validateForm.value,this.image).subscribe((res)=>{
      console.log(res);
      console.log(this.image);
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
