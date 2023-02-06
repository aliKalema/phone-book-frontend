import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Contact} from "../../interfaces/contact";
import {ContactService} from "../../services/contact.service";
import {MatSnackBar} from "@angular/material/snack-bar";
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy{
  sort = 'desc';
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  contactsSubscription: Subscription | undefined;

  contacts!: Array<Contact>;

  toDelete:Array<Contact>= [];
  constructor(private contactService: ContactService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getContacts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getContacts();
  }

  getContacts(): void{
  this.contactsSubscription = this.contactService.getAllContacts( this.sort)
    .subscribe((contactList: Contact[]) => {
      this.contacts = contactList;
    });
  }

  ngOnDestroy(): void {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }

  onSelectContact(contact: Contact) :void{
    if(this.toDelete.length>0) {
      let exist: boolean = false;
      for (let con of this.toDelete) {
        if (con!.id == contact.id) {
          exist = true;
          ;
          break;
        }
      }
      if (exist) {
        for (let i = 0; i < this.toDelete.length; i++) {
          if (this.toDelete[i].id == contact.id) {
            this.toDelete.splice(i, 1);
          }
        }
      } else {
        this.toDelete.push(contact)
      }
    }
    else{
      this.toDelete.push(contact);
    }
    console.log(this.toDelete);
  }

  onSearchContact(searchTerm: string) {
    this.contactsSubscription = this.contactService.getAllContacts(this.sort,searchTerm)
      .subscribe((contactList: Contact[]) => {
        this.contacts = contactList;
      });
  }

  onDeleteContacts():void{
    if(this.toDelete.length>0){
      for(let con of this.toDelete){
        this.contactService.deleteContact(con.id).subscribe();
      }
      this.snackBar.open(`${this.toDelete.length}  Contacts  Deleted `, 'Ok', { duration: 3000 });
      this.toDelete = [];
      this.getContacts();
    }else{
      this.snackBar.open(" 0 Contact  Deleted ", 'Ok', { duration: 3000 });
    }
  }
}
