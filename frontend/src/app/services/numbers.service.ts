import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
   

  private _numberUrl = "/api/numbers"
  private _addContact = "/api/addContact"
  private _deleteNumber = "/api/deleteNumber"
  private _editNumber = "/api/editNumber"

  numbers = new BehaviorSubject<any>('')
  editedContact = new BehaviorSubject<any>('');
  searchingNumbers = new BehaviorSubject<any>(false);


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
    return this._http.post<any>(this._deleteNumber,info)
  }


  editNumbers (info:any) {
  return this._http.post<any>(this._editNumber,info)
  }


}
