import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  modalData: any = {};
  popupObservable = new Subject<string>();
  popupObservable$ = this.popupObservable.asObservable();

  constructor() { }

  hide() {
    this.popupObservable.next('hide');
  }

  show(data) {
    this.modalData = data;
    this.popupObservable.next('show');
  }
}
