import { HttpClient, HttpHeaders } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResult } from '../ViewModels/login-result';
import { User } from '../ViewModels/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // , Authorization': 'Token'
      })
   }

  }

  Register(newUser: User): Observable<User>
  {
    return this.httpClient.post<User>(`${environment.APIBaseURL}/account/register`, JSON.stringify(newUser),this.httpOptions);
  }
  Login(name:string,password:string)
  {
    var userLoginInfo={
      "UserName":name,
      "password":password
    }
    
    // this should call login API 
    return this.httpClient.post<LoginResult>(`${environment.APIBaseURL}/account/login`, JSON.stringify(userLoginInfo),this.httpOptions);
    
  }
  Logout()
  {
    localStorage.removeItem("token");
  }
  get IsLogged()
  {
     return (localStorage.getItem('token'))?true:false;
  }


}
