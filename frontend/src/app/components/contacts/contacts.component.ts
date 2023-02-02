import { Component } from '@angular/core';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
searchingNumber : boolean = false;
constructor(private _numbersService:NumbersService){
  this._numbersService.searchingNumbers.subscribe(item => {
    this.searchingNumber = item;
  })
}

}
