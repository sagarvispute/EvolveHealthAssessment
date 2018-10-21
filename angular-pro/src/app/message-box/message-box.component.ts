import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from './message-service.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  visibility: boolean = false;
  _class: string = '';
  toastSmg: any ;

  constructor(private messageService: MessageServiceService) {
    this.messageService.toastObservable$.subscribe(
      data => {
        this._class = this.messageService.styleClass;

        if(data == 'hide')
          this.visibility = false;
        if(data == 'show') {
          this.visibility = true;

          setTimeout(() => {
            this.messageService.hide();
          }, 3000);
        }
        this.toastSmg = this.messageService.toastSmg;
      }
    )
  }

  ngOnInit() {
  }

  close() {
    this.messageService.hide();
  }
}
