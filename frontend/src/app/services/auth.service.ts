import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _registerUrl = "/api/register"
  private _loginUrl = "/api/login"

  constructor(private http: HttpClient, private _route:Router) { }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token);
        this.currentUser$.next(user);
        this._route.navigate(['/numbers'])
        return userInfo
      })
    )
  }

  currentUser$ = new BehaviorSubject<any>('');

  logOut() {
    localStorage.setItem('token','')
    this.currentUser$.next(null)
    this._route.navigate([''])
  }

  getToken() {
    return localStorage.getItem('token')
  }
}