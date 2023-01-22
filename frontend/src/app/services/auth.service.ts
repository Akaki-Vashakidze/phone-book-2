import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _registerUrl = "http://localhost:4000/api/register"
  private _loginUrl = "http://localhost:4000/api/login"
  
  constructor(private http:HttpClient) { }

  registerUser(user: any) {
   return this.http.post<any>(this._registerUrl,user)
  }

  loginUser (user:any) {
   return this.http.post<any>(this._loginUrl,user)
  }

  userIsLogged = new EventEmitter<boolean>();

  getToken () {
    return localStorage.getItem('token')
  }
}
