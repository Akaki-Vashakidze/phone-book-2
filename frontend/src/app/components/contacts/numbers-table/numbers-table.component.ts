
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NumbersService } from 'src/app/services/numbers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private _numbersService: NumbersService, private _router:Router) {
    this._numbersService.getNumbers().subscribe(
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

  }

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

}
