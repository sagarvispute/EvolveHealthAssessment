import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from './message-service.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  visibility: boolean = false;

  toastData: any;

  constructor(private messageService: MessageServiceService) {
    this.messageService.toastObservable$.subscribe(
      data => {
        if(data == 'hide')
          this.visibility = false;
        if(data == 'show') {
          this.visibility = true;

          setTimeout(() => {
            this.messageService.hide();
          }, 3000);
        }
        this.toastData = this.messageService.toastData;
      }
    )
  }

  ngOnInit() {
  }

  close() {
    this.messageService.hide();
  }
}
