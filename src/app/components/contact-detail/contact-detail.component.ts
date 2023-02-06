import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Contact} from "../../interfaces/contact";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;
  contactId: number=0;
  routerSub:Subscription | undefined;
  contactSub: Subscription |undefined;
  constructor(private contactService: ContactService, private snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerSub= this.activatedRoute.params.subscribe(params => {
      this.contactId = params['id'];
      this.contactService.getContactById(this.contactId).subscribe((res)=>{
        this.contact = res;
      })
    })
  }

  onDeleteContact(id: number) {
    this.contactService.deleteContact(this.contactId).subscribe(()=>{
      this.snackBar.open("Contact Deleted Successfully", 'Ok', { duration: 3000 });
      this.router.navigate([`/contact`]).then();
    });
  }
  onEditContact(id: number) {
    this.router.navigate([`/contacts/edit/${id}`]).then();
  }
}
