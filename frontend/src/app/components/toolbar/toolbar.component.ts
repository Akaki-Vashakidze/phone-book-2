import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _authService:AuthService, private _router:Router) {}
 

 title = 'frontend';
 userIsLogged :boolean = false;


  ngOnInit(): void {
    this._authService.userIsLogged.subscribe(item =>{
    this.userIsLogged = item
   })
  }

  logOut(){
   this._authService.userIsLogged.emit(false)
   this._router.navigate([''])
  }


 
}
