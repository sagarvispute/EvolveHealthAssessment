import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  toastSmg: string = '';
  styleClass: string = '';
  toastObservable = new Subject<string>();
  toastObservable$ = this.toastObservable.asObservable();

  constructor() { }

  hide() {
    this.toastObservable.next('hide');
  }

  show(data, _class) {
    this.styleClass = _class;
    this.toastSmg = data;
    this.toastObservable.next('show');
  }
}
