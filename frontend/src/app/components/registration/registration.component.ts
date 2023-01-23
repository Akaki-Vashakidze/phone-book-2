import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private _formBuilder: FormBuilder,private _authService:AuthService, private _router:Router) {}

  userInfo = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.required],
    mobile:['',Validators.required],
    gender:['',Validators.required],
    password1:['',Validators.required],
    password2:['',Validators.required]
  })

  saveInfo () {
    if(this.userInfo.get('firstname')?.errors?.['required'] || this.userInfo.get('lastName')?.errors?.['required'] || this.userInfo.get('email')?.errors?.['required'] || this.userInfo.get('mobile')?.errors?.['required'] || this.userInfo.get('gender')?.errors?.['required'] || this.userInfo.get('password1')?.errors?.['required'] || this.userInfo.get('password2')?.errors?.['required']) {
      alert('Please fill the form')
      return
    } 
    if(this.userInfo.value.password1 != this.userInfo.value.password2 ) {
      alert('Passwords must be similar')
    }

    let userRegistrationInfo : any = {
      ...this.userInfo.value,
      password:this.userInfo.value.password1,
      contacts:[]
    }

    this._authService.registerUser(userRegistrationInfo)
    .subscribe(
      res => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('userEmail',userRegistrationInfo.email)
        this._authService.currentUser$.next({email:userRegistrationInfo.email})
        this._router.navigate(['/numbers'])
      },
      err =>{
         alert('this email is already taken please restore the password')
        }
    )
    localStorage.setItem('userEmail',userRegistrationInfo.email)
  }
}
