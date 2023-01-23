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
   
  }
 

 title = 'frontend';

 userIn : any ;

  ngOnInit(): void { 
    this.userIn = !!localStorage.getItem('userEmail')
    this._authService.currentUser$.subscribe(item => {
      this.userIn = !!localStorage.getItem('userEmail')
    })
  }

  logOut(){
   this._authService.logOut()
   localStorage.setItem('userEmail','')
   this._authService.currentUser$.next('')
  }


 
}
