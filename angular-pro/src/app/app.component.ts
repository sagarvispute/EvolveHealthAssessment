import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from './modal-box/modal-service.service';
import { CofirmationServiceService } from './confirmation-box/confirmation-service.service';
import { MessageServiceService } from './message-box/message-service.service';
import { AppServiceService } from './app-service.service';

interface contact {
  contact: number,
  email: string,
  firstName: string,
  lastName: string,
  status: boolean,
  checked: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  settingDropdown: boolean = false;
  sortDropdown: boolean = false;

  settingMenu: any = [
    {
      label: 'Add Contact',
      status: true
    },
    {
      label: 'Remove Contact',
      status: false
    },
    {
      label: 'Inactive Contact',
      status: false
    },
    {
      label: 'Active Contact',
      status: false
    }
  ];

  contactList = [];

  constructor(private modalService: ModalServiceService,
    private cofirmationService: CofirmationServiceService,
    private messageService: MessageServiceService,
    private appService: AppServiceService) {
      this.appService.loadContacts().subscribe(
        success => {
          if(success['success']) {
            this.contactList = success['data'];
            this.sortContactList(true);
          }
        },
        failed => {}
      );
    }

  ngOnInit() {
    this.settingMenu[0]['action'] = () => {
      this.addContact();
    };
    this.settingMenu[1]['action'] = () => {
      this.removeSelected();
      this.enableDisableMenu();
    };
    this.settingMenu[2]['action'] = () => {
      this.changeStatus(false);
      this.enableDisableMenu();
    };
    this.settingMenu[3]['action'] = () => {
      this.changeStatus(true);
      this.enableDisableMenu();
    };
    this.contactList.forEach(element => {
      element['checked'] = false;
    });
    this.enableDisableMenu();
  }

  addContact() {
    const me = this;
    me.settingDropdown = false;

    let newData = {
      contact: null,
      email: '',
      firstName: '',
      lastName: ''
    };
    newData['validate'] = Object.assign({}, newData);
    newData['status'] = true;

    let contactData = {
      selector: 'edit-contact',
      header: 'Edit Contact',
      content: newData,
      buttons: [
        {
          label: 'Save',
          btnClass: 'btn-primary',
          action: function() {
            newData['validate'].firstName = !me.validateInputValue(newData.firstName, 'require');
            newData['validate'].lastName = !me.validateInputValue(newData.lastName, 'require');
            newData['validate'].contact = !me.validateInputValue(newData.contact, 'contact');
            newData['validate'].email = !me.validateInputValue(newData.email, 'email');

            if(me.validateInputValue(newData.contact, 'contact') && me.validateInputValue(newData.email, 'email') && me.validateInputValue(newData.firstName, 'require') && me.validateInputValue(newData.lastName, 'require')) {
              me.appService.saveContact(newData).subscribe(
                success => {
                  if(success['success']) {
                    me.addContactInList(success['data']);
                    me.modalService.hide();

                    let toastObj = {
                      message: 'Contact added successfully!'
                    };
                    me.messageService.show(toastObj);
                  }
                },
                failed => {
                  console.log(failed)
                }
              );
            }
          }
        },
        {
          label: 'Cancel',
          btnClass: 'btn-alert',
          action: function() {
            me.modalService.hide();
          }
        }
      ]
    };
    this.modalService.show(contactData);
  }

  enableDisableMenu() {
    let _delete: boolean = false;
    let _deactive: boolean = false;
    let _active: boolean = false;

    this.contactList.forEach(element => {
      if(element['checked']) {
        _delete = true;
         
        if(element['status']) {
          _deactive = true;
        }
        if(!element['status']) {
          _active = true;
        }
      }
    });

    let removeIndex = this.settingMenu.find(x => x.label == 'Remove Contact');
    if(removeIndex)
      removeIndex['status'] = _delete;

    let deactiveIndex = this.settingMenu.find(x => x.label == 'Inactive Contact');
    if(deactiveIndex)
      deactiveIndex['status'] = _deactive;

    let activeIndex = this.settingMenu.find(x => x.label == 'Active Contact');
    if(activeIndex)
      activeIndex['status'] = _active;

    if(_deactive && _active) {
      deactiveIndex['status'] = false;
      activeIndex['status'] = false;
    }
  }

  disableDropdown(type) {
    if(type == 'sort')
      this.sortDropdown = false;
    if(type == 'menu')
      this.settingDropdown = false;
  }

  addContactInList(data) {
    this.contactList.unshift(data);
  }

  changeStatus(stat) {
    const me = this;
    let confirmObj = {
      description: 'Are you sure to delete this contact ?',
      buttons: [
        {
          label: 'Accept',
          btnClass: 'btn-primary',
          action: function() {
            let list = [];
            me.contactList.forEach(element => {
              if(element['checked']) {
                list.push(element._id)
              }
            });
            me.appService.updateStatus(list, stat).subscribe(
              success => {
                if(success['success']) {
                  me.contactList.forEach(element => {
                    if(element['checked']) {
                      element.status = stat;
                      element.checked = false;
                    }
                  });
      
                  let toastObj = {
                    message: 'Slected contacts status have been changed!'
                  };
                  me.cofirmationService.hide();
                  me.messageService.show(toastObj);
                }
              },
              failed => {
                console.log(failed)
              }
            );
          }
        },
        {
          label: 'Reject',
          btnClass: 'btn-alert',
          action: function() {
            me.cofirmationService.hide();
          }
        }
      ]
    };
    me.cofirmationService.show(confirmObj);
    this.settingDropdown = false;
  }

  deleteContact(data) {
    const me = this;
    let confirmObj = {
      description: 'Are you sure to delete this contact ?',
      buttons: [
        {
          label: 'Accept',
          btnClass: 'btn-primary',
          action: function() {
            me.appService.deleteContacts([data._id]).subscribe(
              success => {
                if(success['success']) {
                  me.contactList = me.contactList.filter(x => x._id !== data._id);
                  me.cofirmationService.hide();

                  let toastObj = {
                    message: 'Contact delete successfully!'
                  };
                  me.messageService.show(toastObj);
                  me.enableDisableMenu();
                }
              },
              failed => {
                console.log(failed)
              }
            );
          }
        },
        {
          label: 'Reject',
          btnClass: 'btn-alert',
          action: function() {
            me.cofirmationService.hide();
          }
        }
      ]
    };
    me.cofirmationService.show(confirmObj);
  }

  removeSelected() {
    const me = this;
    let confirmObj = {
      description: 'Are you sure to delete this contact ?',
      buttons: [
        {
          label: 'Accept',
          btnClass: 'btn-primary',
          action: function() {
            let list = [];
            me.contactList.forEach(element => {
              if(element.checked)
                list.push(element._id);
            });

            me.appService.deleteContacts(list).subscribe(
              success => {
                if(success['success']) {
                  me.contactList = me.contactList.filter(x => x.checked == false);
              
                  let toastObj = {
                    message: 'Slected contacts have been deleted!'
                  };
                  me.cofirmationService.hide();
                  me.messageService.show(toastObj);
                }
              },
              failed => {}
            );
          }
        },
        {
          label: 'Reject',
          btnClass: 'btn-alert',
          action: function() {
            me.cofirmationService.hide();
          }
        }
      ]
    };
    me.cofirmationService.show(confirmObj);
    this.settingDropdown = false;
  }

  editContact(data) {
    const me = this;
    let cloneData = Object.assign({}, data);
    cloneData.validate = {
      firstName: false,
      lastName: false,
      contact: false,
      email: false
    };
    let contactData = {
      selector: 'edit-contact',
      header: 'Edit Contact',
      content: cloneData,
      buttons: [
        {
          label: 'Save',
          btnClass: 'btn-primary',
          action: function() {
            cloneData.validate.firstName = !me.validateInputValue(cloneData.firstName, 'require');
            cloneData.validate.lastName = !me.validateInputValue(cloneData.lastName, 'require');
            cloneData.validate.contact = !me.validateInputValue(cloneData.contact, 'contact');
            cloneData.validate.email = !me.validateInputValue(cloneData.email, 'email');

            if(me.validateInputValue(cloneData.contact, 'contact') && me.validateInputValue(cloneData.email, 'email') && me.validateInputValue(cloneData.firstName, 'require') && me.validateInputValue(cloneData.lastName, 'require')) {
              me.appService.updateContact(cloneData).subscribe(
                success => {
                  if(success['success']) {
                    let toastObj = {
                      message: 'Contact has been updated!'
                    };
                    me.modalService.hide();
                    me.messageService.show(toastObj);

                    let contactInd = me.contactList.findIndex(x => x._id == cloneData._id);
                    me.contactList[contactInd] = cloneData;
                  }
                },
                failed => {
                  console.log(failed)
                }
              );
            } else {
              //alert('All fields are mandatory!');
            }
          }
        },
        {
          label: 'Cancel',
          btnClass: 'btn-alert',
          action: function() {
            me.modalService.hide();
          }
        }
      ]
    };
    this.modalService.show(contactData);
  }

  sortContactList(type) {
    if(type) {
      this.contactList.sort((a,b)=>a.firstName.localeCompare(b.firstName));
    } else {
      this.contactList.sort((a,b)=>b.firstName.localeCompare(a.firstName));
    }
    this.sortDropdown = false;
  }

  validateInputValue(_value, _type) {
    if(_value !== null || _value !== '') {
      if(_type == 'email') {
        return this.validateEmail(_value);
      } else if(_type == 'number' && _value !== null) {
        return this.validateNumber(_value);
      } else if(_type == 'contact' && _value !== null && _value.length >= 10) {
        return this.validateContact(_value);
      } else if(_type == 'require' && (_value !== '' || _value.length > 0)) {
        return true; 
      } else {
        return false;
      }
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateNumber(_num) {
    let re = /^\d+$/;
    return re.test(String(_num).toLowerCase());
  }
  validateContact(_num) {
    let re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(String(_num).toLowerCase());
  }
}
