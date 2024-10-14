import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup |undefined;

  constructor(
    private service:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private snackbar:MatSnackBar
  ){}

  ngOnInit(){
        this.loginForm = this.fb.group(
          {
            email:['',Validators.required],
            password:['',[Validators.required,Validators.minLength(5)]]
          }
        )
  }
   buttondisabled():string{
    return this.loginForm.invalid? 'red':'blue';
   }

  login(){
    // console.log(this.loginForm.value);
    this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value,
    ).subscribe((response)=>{
      console.log(response);
       if(StorageService.isAdminLoggedIn()){
        console.log("Admin Logged");
        this.router.navigateByUrl("admin/dashboard");
       }
       else if(StorageService.isStudentLoggedIn()){
        this.router.navigateByUrl("student/dashboard")
       }
       else if(StorageService.isTeacherLoggedIn()){
        this.router.navigateByUrl("teacher/dashboard")
       }
    },
    (error)=>{
      if(error.status===403){
        this.snackbar.open("Bad Credentials","Close",{duration:5000});
        this.loginForm.get(['email']).setValue('');
        this.loginForm.get(['password']).setValue('');
        this.loginForm.get('email').setErrors({ 'incorrect': true });
        this.loginForm.get('password').setErrors({ 'incorrect': true });
        this.router.navigateByUrl('login');
        return;
      }
      else if(error.status==401){
        this.snackbar.open("Bad Credentials","Close",{duration:5000});
        this.loginForm.get(['email']).setValue('');
        this.loginForm.get(['password']).setValue('');
        this.loginForm.get('email').setErrors({ 'incorrect': true });
        this.loginForm.get('password').setErrors({ 'incorrect': true });
        this.router.navigateByUrl('login');
      }
    })
  }

}
