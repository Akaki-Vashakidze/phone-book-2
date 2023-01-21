import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NumbersTableDataSource, NumbersTableItem } from './numbers-table-datasource';

@Component({
  selector: 'app-numbers-table',
  templateUrl: './numbers-table.component.html',
  styleUrls: ['./numbers-table.component.scss']
})
export class NumbersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<NumbersTableItem>;
  dataSource: NumbersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'name','number','edit'];

  constructor() {
    this.dataSource = new NumbersTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
