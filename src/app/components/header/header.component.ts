import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm: string="";
  @Output()
  searchContact = new EventEmitter();
  @Output()
  deleteContact =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onKeypressEvent($event: KeyboardEvent) {
    this.searchContact.emit(this.searchTerm);
  }

  onDeleteContact(){
    this.deleteContact.emit();
  }

  search(searchTerm: string) {

  }
}
