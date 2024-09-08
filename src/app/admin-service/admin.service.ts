import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL=["http://localhost:8080/"];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

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
    return this.http.post<[]>(BASIC_URL+"api/admin/student",studentDto,{headers: this.createAuthenticationHeader()})
  }
}
