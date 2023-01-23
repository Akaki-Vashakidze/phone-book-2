
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NumbersService } from 'src/app/services/numbers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-numbers-table',
  templateUrl: './numbers-table.component.html',
  styleUrls: ['./numbers-table.component.scss']
})
export class NumbersTableComponent {
  columns: string[] = ['name', 'number', 'edit/delete'];
  Data: any;
  dataSource: any;
  currentPage :any = 0;
  numbersPerPage : any = 5;
  user : any;
  editedContact:any;

  constructor(public _dialog:MatDialog,private _numbersService: NumbersService, private _router:Router, private _authService:AuthService) {

    this._numbersService.editedContact.subscribe(item => {
      this.editedContact = item;
    })

    this._numbersService.getNumbers(localStorage.getItem('userEmail')).subscribe(
      item => {
      this.Data = item;
      this.dataSource = new MatTableDataSource(this.Data);

      if(this.dataSource) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
    err => {
      if(err instanceof HttpErrorResponse) {
        if (err.status === 401) {
         this._router.navigate(['/login'])
        }
        if(err.status === 500) {
          alert('Your Session is timed out, please log in again!')
          this._router.navigate(['/login'])
        }
      }
    }
    )

    this._numbersService.numbers.subscribe(item => {
      this.Data = item;
      this.dataSource = new MatTableDataSource(this.Data);
      if(this.dataSource) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
    err => {
      if(err instanceof HttpErrorResponse) {
        if (err.status === 401) {
         this._router.navigate(['/login'])
        }
        if(err.status === 500) {
          alert('Your Session is timed out, please log in again!')
          this._router.navigate(['/login'])
        }
      }
    }
    )

    this._authService.currentUser$.subscribe(item => {
      this.user = item
    })
  }

  onPageChange (event:any) {
    this.currentPage = event.pageIndex;
    this.numbersPerPage = event.pageSize;
  }

  delete (index:any) {
    let tableIndex = this.currentPage * this.numbersPerPage + index
    this.Data.splice(tableIndex,1)
    let info = {
      email:this.user.email,
      numbersArray:this.Data
    }

    this._numbersService.deleteNumber(info)
    .subscribe(item => {
      console.log(item)
      this._numbersService.numbers.next(item)
    })
  }

 
  // this._numbersService.editNumbers(info)
  // .subscribe(item => {
  //   console.log(item)
  //   this._numbersService.numbers.next(item)
  // })


  openDialog(index:any){

  let tableIndex = this.currentPage * this.numbersPerPage + index;
  let contactInfo = this.Data[tableIndex]
   let dialogRef =  this._dialog.open(EditDialogComponent, {data:{contact:contactInfo}})

   dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    this.edit(index)
   })
  }

  edit (index:any) {

  let tableIndex = this.currentPage * this.numbersPerPage + index;
  let contactInfo = this.Data[tableIndex]
   console.log(this.editedContact,contactInfo)

  }

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

}
