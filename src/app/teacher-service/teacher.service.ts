import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL =['https://school-management-system-backend-6zvk.onrender.com/'];

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http:HttpClient) { }

  createAuthenticationHeader():HttpHeaders{
    let authHeader :HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',"Bearer "+StorageService.getToken()
    );
  }

  getTeacherById():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/teacher/${StorageService.getUserId()}`,
   {headers:this.createAuthenticationHeader()}
  )
  }

}
