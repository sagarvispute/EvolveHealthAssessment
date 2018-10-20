import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CofirmationServiceService {
  confirmationData: any = {};
  confirmationObservable = new Subject<string>();
  confirmationObservable$ = this.confirmationObservable.asObservable();

  constructor() { }

  hide() {
    this.confirmationObservable.next('hide');
  }

  show(data) {
    this.confirmationData = data;
    this.confirmationObservable.next('show');
  }
}
