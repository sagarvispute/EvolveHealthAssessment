import { Component, OnInit } from '@angular/core';
import { CofirmationServiceService } from './confirmation-service.service';

@Component({
  selector: 'confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class confirmationBoxComponent implements OnInit {
  visibility: boolean = false;
  confirmationData: any;

  constructor(private cofirmationService: CofirmationServiceService) {
    this.cofirmationService.confirmationObservable$.subscribe(
      data => {
        if(data == 'hide')
          this.visibility = false;
        if(data == 'show')
          this.visibility = true;
        this.confirmationData = this.cofirmationService.confirmationData;
      }
    )
  }

  ngOnInit() {
  }

}
