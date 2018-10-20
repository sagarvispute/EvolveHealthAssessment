import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Input('data') data;
  @Output() dataChange = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() deleteContact = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  checkedRecord() {
    this.dataChange.emit('change');
  }

  editContact(contactData) {
    this.edit.emit(contactData);
  }

  removeContact(contactData) {
    this.deleteContact.emit(contactData);
  }
}
