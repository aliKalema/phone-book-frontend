import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.css']
})
export class ContactHeaderComponent implements OnInit {
  @Output()
  columnsCountChange = new EventEmitter<number>();

  @Output()
  sortChange = new EventEmitter<string>();
  itemsShowCount = 12;
  sort = 'desc';

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
