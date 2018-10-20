import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input('data') data;
   
  constructor() { }

  ngOnInit() {
  }

}
