import { Component } from '@angular/core';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
mymodel: any;
kkk :any;
numbers : any;

constructor(private _numbersService:NumbersService) {

this._numbersService.numbers.subscribe(item => {
  console.log(item)
  this.numbers = item;
})
}

valuechange(newValue:any) {
 this.kkk =  setTimeout(() => {
  this.mymodel = newValue;
  let searchedNumbers = this.numbers.filter((item:any) => {
    return item.name.includes(newValue)
   } 
  )
  console.log(this.numbers)
  this._numbersService.numbers.next(searchedNumbers)
  console.log(newValue)
  }, 400);
  
}

stopTimer() {
    clearTimeout(this.kkk)
}

}
