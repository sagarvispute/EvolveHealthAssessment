import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  
  constructor(private http: HttpClient) { }

  loadContacts() {
    return this.http.get('api/getContacts');
  }

  saveContact(data) {
    return this.http.post('api/saveContact', data);
  }

  deleteContacts(removeIds) {
    let _obj = {
      ids: removeIds
    };
    return this.http.post('api/deleteConatcts', _obj);
  }

  updateStatus(removeIds, status) {
    let _obj = {
      ids: removeIds,
      status: status
    };
    return this.http.post('api/updateStatus', _obj);
  }

  updateContact(user) {
    return this.http.post('api/updateContact', user);
  }
}
