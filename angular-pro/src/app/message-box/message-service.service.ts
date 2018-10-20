import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  toastData: any = {};
  toastObservable = new Subject<string>();
  toastObservable$ = this.toastObservable.asObservable();

  constructor() { }

  hide() {
    this.toastObservable.next('hide');
  }

  show(data) {
    this.toastData = data;
    this.toastObservable.next('show');
  }
}
