import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../../interfaces/contact";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.css']
})
export class ContactBoxComponent implements OnInit {
  @Input()
  fullWidthMode = false;

  @Input()
  contact!: Contact;

  @Output()
  selectContact =  new EventEmitter();

  url: string=environment.serverUrl+"/uploads/"
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onEditContact(id:number):void{
    this.router.navigate([`/contacts/edit/${id}`]).then();
  }

  select() {
    this.selectContact.emit(this.contact);
  }

  onViewContact(id: number) {
    this.router.navigate([`/contact/${id}`]).then();
  }
}
