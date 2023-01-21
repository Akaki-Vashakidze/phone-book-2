import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  
constructor(private _formBuilder: FormBuilder, private _authService:AuthService, private _router:Router) {}

logInInfo = this._formBuilder.group({
  email:['',Validators.required],
  password:['',Validators.required]
})

logIn() {
  console.log((this.logInInfo.value))
  this._authService.loginUser(this.logInInfo.value)
  .subscribe(
    res =>  {
      localStorage.setItem('token',res.token)
      this._authService.userIsLogged.emit(true)
      this._router.navigate(['/numbers'])
    },
    err => console.log(err)
  )
}
}
