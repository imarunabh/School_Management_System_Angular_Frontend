import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL =['https://school-management-system-backend-6zvk.onrender.com/'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  imageUrl:string;
  constructor(private http:HttpClient) { }

  setImage(url:string){
    this.imageUrl=url;
  }
  getImage():string{
    return this.imageUrl;
  }

  createAuthenticationHeader():HttpHeaders{
    let authHeader :HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',"Bearer "+StorageService.getToken()
    );
  }

  getAdminById():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/admin/${StorageService.getUserId()}`,
   {headers:this.createAuthenticationHeader()}
  )
  }

  postStudent(studentDto:any,image:File):Observable<any>{
    console.log(image);
    const formData: FormData = new FormData();
    formData.append('student', new Blob([JSON.stringify(studentDto)], { type: 'application/json' }));
    formData.append('image', image);
    return this.http.post<[]>(BASIC_URL+"api/student/create-student",formData,{headers: this.createAuthenticationHeader()})
  }

  getAllStudents():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"api/student/get-All-Student",{headers:this.createAuthenticationHeader()})
  }

  markTodaysAttendance(email:string):Observable<any>{
    return this.http.post<[]>(BASIC_URL+"api/student/mark-attendance",email,{headers:this.createAuthenticationHeader()})
  }


}
