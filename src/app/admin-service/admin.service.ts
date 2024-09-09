import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL=["http://localhost:8080/"];

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

  postStudent(studentDto:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL+"api/student/create-student",studentDto,{headers: this.createAuthenticationHeader()})
  }

  getAllStudents():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"api/student/get-All-Student",{headers:this.createAuthenticationHeader()})
  }


}
