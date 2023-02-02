
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


@Component({
  selector: 'app-numbers-table',
  templateUrl: './numbers-table.component.html',
  styleUrls: ['./numbers-table.component.scss']
})
export class NumbersTableComponent {
  columns: string[] = ['name', 'number', 'edit/delete'];
  Data: any;
  dataSource: any;
  currentPage: any = 0;
  numbersPerPage: any = 5;
  user: any;
  editedContact: any;

  constructor(public _dialog: MatDialog, private _numbersService: NumbersService, private _router: Router, private _authService: AuthService) {

    this._numbersService.editedContact.subscribe(item => {
      this.editedContact = item;
    })

    this._numbersService.getNumbers(localStorage.getItem('userEmail')).subscribe(
      item => {
        this.Data = item;
        this.dataSource = new MatTableDataSource(this.Data);
        this._numbersService.numbers.next(item)
        if (this.dataSource) {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
          if (err.status === 500) {
            alert('Your Session is timed out, please log in again!')
            this._router.navigate(['/login'])
          }
        }
      }
    )

    this._numbersService.numbers.subscribe(item => {
      this.Data = item;
      this.dataSource = new MatTableDataSource(this.Data);
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
          if (err.status === 500) {
            alert('Your Session is timed out, please log in again!')
            this._router.navigate(['/login'])
          }
        }
      }
    )

    this._authService.currentUser$.subscribe(item => {
      this.user = item
      if (localStorage.getItem('userEmail') == '' || !localStorage.getItem('userEmail')) {
        if (item.email) {
          localStorage.setItem('userEmail', item.email)
        } else {
          localStorage.setItem('userEmail', '')
        }

      }

    })
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.numbersPerPage = event.pageSize;
  }

  delete(index: any) {
    console.log(this.dataSource.filteredData)
    let tableIndex = this.currentPage * this.numbersPerPage + index
    let contact = this.dataSource.filteredData[tableIndex]
    let info = {
      email: localStorage.getItem('userEmail'),
      contact: contact
    }

    this._numbersService.deleteNumber(info)
      .subscribe(item => {
        this._numbersService.numbers.next(item)
      })
  }


  // this._numbersService.editNumbers(info)
  // .subscribe(item => {
  //   console.log(item)
  //   this._numbersService.numbers.next(item)
  // })


  openDialog(index: any) {

    let tableIndex = this.currentPage * this.numbersPerPage + index;
    let contactInfo = this.Data[tableIndex]
    let dialogRef = this._dialog.open(EditDialogComponent, { data: { contact: contactInfo } })

    dialogRef.afterClosed().subscribe(result => {
      this.edit(index)
    })
  }

  applyFilter(filterValue:any) {
  this.dataSource.filter = filterValue.target.value.trim().toLowerCase()
  }

  edit(index: any) {

    let tableIndex = this.currentPage * this.numbersPerPage + index;
    console.log(this.editedContact)
   this.dataSource.filteredData[tableIndex].name = this.editedContact.editedContact.name
   this.dataSource.filteredData[tableIndex].number = this.editedContact.editedContact.number
    this.editedContact.numbersArray = this.Data

    this._numbersService.editNumbers(this.editedContact)
      .subscribe(
        res => console.log(res),
        err => { console.log(err) }
      )
  }

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

}
