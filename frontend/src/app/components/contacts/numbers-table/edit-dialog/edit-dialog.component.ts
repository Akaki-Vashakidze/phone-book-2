import { Component,inject,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder,Validators} from '@angular/forms';
import { NumbersService } from 'src/app/services/numbers.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

export class EditDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public _data:any,private _formBuilder: FormBuilder,private _numbersService:NumbersService) {
  console.log(_data)
}
editedNumberInfo = this._formBuilder.group({
  name:['',Validators.required],
  number:['',Validators.required]
})

getEditedNumber() {
  let info = {
    email:localStorage.getItem('userEmail'),
    numbersArray:this.editedNumberInfo.value
  }
  
this._numbersService.editedContact.next(info)
}
}
