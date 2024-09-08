import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  validateForm: FormGroup;

  constructor(private service:AdminService,private fb:FormBuilder,private snackbar:MatSnackBar){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      email:["",Validators.required],
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
      }
      else{
        this.snackbar.open("Something went wrong","Close",{duration:5000})
      }

    },
  (error)=>{
    if(error.status===400){
      this.snackbar.open("Something went wrong","Close",{duration:5000})
    }
  });
  }
  

}
