import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  email:string ="";
  constructor(private http:HttpClient) { }

  setEmail(email:string){
    this.email=email;
  }
  
  getEmail():string{
    return this.email;
  }

  createAuthenticationHeader():HttpHeaders{
    let authHeader :HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',"Bearer "+StorageService.getToken()
    );
  }

  getStudentById():Observable<any>{
   return this.http.get<[]>(BASIC_URL+`api/student/${StorageService.getUserId()}`,
   {headers:this.createAuthenticationHeader()})
  }

  getStudentAttendanceByEmail():Observable<any>{
    // console.log(this.email);
    return this.http.post<[]>(BASIC_URL + `api/student/get-attendance-email`,this.email,{headers:this.createAuthenticationHeader()})
  }
}
