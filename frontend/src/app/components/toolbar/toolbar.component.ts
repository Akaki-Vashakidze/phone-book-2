import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _authService:AuthService, private _router:Router) {
    this.currentUser$ = this._authService.currentUser$;
  }
 

 title = 'frontend';
 currentUser$ : any = null;

  ngOnInit(): void {
  }

  logOut(){
   this._authService.logOut()
  }


 
}
