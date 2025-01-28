import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { WorklistService } from '../worklist.service';
import { BehaviorSubject, filter, first, map, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-datatable',
  imports: [CommonModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent {

  @Input() title: string = '';
  @Input() data: Observable<any[]> | undefined;
  @Input() filterKey: string = '';
  @Input() filterValue: string = '';
  @Output() onRowSelected = new EventEmitter<any>();

  columns$: Observable<string[]> | undefined;
  hiddenRowCount$: Observable<number> | undefined;
  selectedRow: any;

  ngOnInit() {
    this.columns$ = this.data?.pipe(first(), map(item => this.getKeys(item[0])));
    this.hiddenRowCount$ = this.data?.pipe(
      map(data => data.filter(item => !this.filterRow(item)).length)
    );
  }

  getKeys(obj: any) {
    if (!!obj && obj != null) {
      return Object.keys(obj);
    }
    return [];
  }

  onRowClick(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
    this.onRowSelected.emit(row);
  }

  filterRow(row: any) {
    return this.filterKey === '' || row[this.filterKey].includes(this.filterValue);
  }

}
