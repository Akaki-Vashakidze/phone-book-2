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

logInInfo : any= this._formBuilder.group({
  email:['',Validators.required],
  password:['',Validators.required]
})

logIn() {
  this._authService.loginUser(this.logInInfo.value)
  .subscribe(
    res =>  {
      localStorage.setItem('token',res.token);
      localStorage.setItem('userEmail',this.logInInfo.value.email)
      this._authService.userEmail.next(this.logInInfo.value.email)
      this._authService.userIsLogged.emit(true)
      this._router.navigate(['/numbers'])
    },
    err => console.log(err)
  )

}
}
