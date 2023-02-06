import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Contact} from "../interfaces/contact";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  getAllContacts(sort: string, searchTerm?: string): Observable<Array<Contact>> {
    let queryParams = new HttpParams();
    if (searchTerm != undefined) {
      queryParams = queryParams.append("searchTerm", searchTerm);
    }
    if (sort != undefined) {
      queryParams = queryParams.append("sort", sort);
    }
    return this.httpClient.get<Array<Contact>>(`${env.serverUrl}/api/v1/contacts/`, {params: queryParams}).pipe(map(contacts => contacts.map(val => {
      if(val.image != null || val.image!=undefined){
        val.image = `${env.serverUrl}/uploads/${val.image}`;
      }
      return val;
    })));
  }

  getContactById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${env.serverUrl}/api/v1/contacts/${id}`).pipe(map(val => {
      val.image = `${env.serverUrl}/uploads/${val.image}`;
      return val;
    }));
  }

  addContact(contact: FormData): Observable<Contact> {
    return this.httpClient.post<Contact>(`${env.serverUrl}/api/v1/contacts`, contact);
  }

  editContact(contact: FormData,id: number): Observable<Contact> {
    return this.httpClient.put<Contact>(`${env.serverUrl}/api/v1/contacts/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.httpClient.delete(`${env.serverUrl}/api/v1/contacts/${id}`);
  }
}
