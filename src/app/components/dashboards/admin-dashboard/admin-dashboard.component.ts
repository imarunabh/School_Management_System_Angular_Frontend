import { Component } from '@angular/core';
import { AdminService } from '../../../admin-service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  admin:any;

  constructor(private  service:AdminService){}

  ngOnInit(){
    this.getAdminById();
  }

  getAdminById(){
    this.service.getAdminById().subscribe((res)=>{
      console.log(res);7
      this.admin=res;
    })
  }

}
