import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from './modal-service.service';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {
  visibility: boolean = false;
  modalData: any = {};

  constructor(private modalService: ModalServiceService) {
    this.modalService.popupObservable$.subscribe(
      data => {
        if(data == 'hide')
          this.visibility = false;
        if(data == 'show')
          this.visibility = true;
        this.modalData = this.modalService.modalData;
      }
    );
  }

  ngOnInit() {
  }

  close() {
    this.modalService.hide();
  }

}
