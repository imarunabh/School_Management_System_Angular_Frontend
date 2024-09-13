import { Component } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { AdminService } from './admin-service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'School_Management_System';

  constructor(private router:Router) {}

  isAdminLoggedIn : boolean;
  isStudentLoggedIn : boolean;
  isTeacherLoggedIn :boolean;

  
  ngOnInit(){
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.updateUserLoggedStatus();
      }
    })
    console.log(this.isAdminLoggedIn)
  }

  isAdmin:boolean = StorageService.isAdminLoggedIn();
  isStudent:boolean = StorageService.isStudentLoggedIn();
  


  private updateUserLoggedStatus():void{
    this.isTeacherLoggedIn = StorageService.isTeacherLoggedIn();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isStudentLoggedIn = StorageService.isStudentLoggedIn();
 }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login")
  }
}
