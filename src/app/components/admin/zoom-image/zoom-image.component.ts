import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin-service/admin.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrl: './zoom-image.component.css'
})
export class ZoomImageComponent implements OnInit{
  imageUrl:string;

  constructor(private router:Router,private adminService:AdminService,private dialog:MatDialog) {}

  ngOnInit(): void {
   this.imageUrl= this.adminService.getImage();
   console.log(this.imageUrl);
  }

  close(){
    this.dialog.closeAll();
  }


}
