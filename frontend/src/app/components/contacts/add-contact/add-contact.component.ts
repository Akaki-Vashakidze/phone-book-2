import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { NumbersService } from 'src/app/services/numbers.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {


  email: any;
  constructor(private _formBuilder: FormBuilder, private _numbersService: NumbersService, private _authService: AuthService) {

  }

  contactInfo = this._formBuilder.group({
    name: ['', Validators.required],
    number: ['', Validators.required]
  })


  addContact() {

    this.email = localStorage.getItem('userEmail')
    
    let userAndNewContact = {
      userEmail: this.email,
      newContact: this.contactInfo.value
    }
    
    this._numbersService.addContact(userAndNewContact)
      .subscribe(
        res => {
          console.log(res)
          this._numbersService.numbers.next(res)
        },
        err => console.log(err)
      ) 
  }
}
