import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
    Data : any = [
    { name: 'Akaki Vashakidze', number: '01:23.22'},
    { name: 'Tsotne Maisuradze', number: '02:23.22'},
    { name: 'Nika Kaulashvili', number:'04:23.22'},
    { name: 'Tsontne Devdariani', number: '00:53.22'},
    { name: 'Mishiko Sanadze', number: '01:13.22'},
    { name: 'Luka Pataraia', number: '01:25.22'},
    { name: 'Nodo Margvelashvili', number: '01:20.22'},
    { name: 'Juder Bitchikashvili', number: '01:53.22'},
    { name: 'Rati Kanashvili', number: '01:03.22'},
    { name: 'Armazi Dugashvili', number: '01:03.12'},
    { name: 'Irakli Revishvili', number: '01:43.22'},
  ];

  private _numberUrl = "http://localhost:4000/api/numbers"
  private _addContact = "http://localhost:4000/api/addContact"

  constructor(private _http:HttpClient) { }

  getNumbers () {
   return this._http.get<any>(this._numberUrl)
  }

  addContact(contactInfo:any) {
    console.log(contactInfo)
    return this._http.post<any>(this._addContact,contactInfo)
  }

  numbers = new BehaviorSubject<any>(this.Data)

}
