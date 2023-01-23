import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
   

  private _numberUrl = "http://localhost:4000/api/numbers"
  private _addContact = "http://localhost:4000/api/addContact"
  private _deleteNumber = "http://localhost:4000/api/deleteNumber"
  private _editNumber = "http://localhost:4000/api/editNumber"

  constructor(private _http:HttpClient) { }

  getNumbers (userEmail : any) {
    let info :any = {
      email:userEmail
    }
   return this._http.post<any>(this._numberUrl,info)
  }

  addContact(contactInfo:any) {
    return this._http.post<any>(this._addContact,contactInfo)
  }

  deleteNumber (info :any) {
    console.log(info)
    return this._http.post<any>(this._deleteNumber,info)
  }

  numbers = new BehaviorSubject<any>('')

  editNumbers (info:any) {
  console.log(info)
  return this._http.post<any>(this._editNumber,info)
  }

  editedContact = new BehaviorSubject<any>('');

}
