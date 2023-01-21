import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface NumbersTableItem {
  name: string;
  number: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: NumbersTableItem[] = [
  {number: 1, name: 'Hydrogen'},
  {number: 2, name: 'Helium'},
  {number: 3, name: 'Lithium'},
  {number: 4, name: 'Beryllium'},
  {number: 5, name: 'Boron'},
  {number: 6, name: 'Carbon'},
  {number: 7, name: 'Nitrogen'},
  {number: 8, name: 'Oxygen'},
  {number: 9, name: 'Fluorine'},
  {number: 10, name: 'Neon'},
  {number: 11, name: 'Sodium'},
  {number: 12, name: 'Magnesium'},
  {number: 13, name: 'Aluminum'},
  {number: 14, name: 'Silicon'},
  {number: 15, name: 'Phosphorus'},
  {number: 16, name: 'Sulfur'},
  {number: 17, name: 'Chlorine'},
  {number: 18, name: 'Argon'},
  {number: 19, name: 'Potassium'},
  {number: 20, name: 'Calcium'},
];

/**
 * Data source for the NumbersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class NumbersTableDataSource extends DataSource<NumbersTableItem> {
  data: NumbersTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<NumbersTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: NumbersTableItem[]): NumbersTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: NumbersTableItem[]): NumbersTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.number, +b.number, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
