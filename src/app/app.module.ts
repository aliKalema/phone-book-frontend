import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ContactComponent } from './components/contact/contact.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactHeaderComponent } from './components/contact-header/contact-header.component';
import { ContactBoxComponent } from './components/contact-box/contact-box.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactDetailComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ContactAddComponent,
    ContactHeaderComponent,
    ContactBoxComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
