import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactComponent} from "./components/contact/contact.component";
import {ContactDetailComponent} from "./components/contact-detail/contact-detail.component";
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {EditContactComponent} from "./components/edit-contact/edit-contact.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "contact"
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'contact/:id',
    component: ContactDetailComponent
  },
  {
    path: 'contacts/add',
    component: ContactAddComponent
  },
  {
    path: 'contacts/edit/:id',
    component: EditContactComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
