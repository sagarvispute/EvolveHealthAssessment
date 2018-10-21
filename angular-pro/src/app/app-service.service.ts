import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConstants } from './constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  
  constructor(private http: HttpClient) { }

  loadContacts() {
    return this.http.get(appConstants.remote.loadContacts);
  }

  saveContact(data) {
    return this.http.post(appConstants.remote.saveContact, data);
  }

  deleteContacts(removeIds) {
    let _obj = {
      ids: removeIds
    };
    return this.http.post(appConstants.remote.deleteContact, _obj);
  }

  updateStatus(removeIds, status) {
    let _obj = {
      ids: removeIds,
      status: status
    };
    return this.http.post(appConstants.remote.changeStatus, _obj);
  }

  updateContact(user) {
    return this.http.post(appConstants.remote.updateContact, user);
  }
}
