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
  }

  addContact() {
    const me = this;
    me.settingDropdown = false;

    let newData = {
      contact: null,
      email: null,
      firstName: null,
      lastName: null,
      status: true
    };

    let contactData = {
      selector: 'edit-contact',
      header: 'Edit Contact',
      content: newData,
      buttons: [
        {
          label: 'Save',
          btnClass: 'btn-primary',
          action: function() {
            if(newData.contact && newData.contact !== null && newData.email !== '' && newData.email !== null && newData.firstName !== '' && newData.firstName !== null && newData.lastName !== '' &&newData.lastName !== null) {
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
              
            } else {
              alert('All fields are mandatory!');
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

    let deactiveIndex = this.settingMenu.find(x => x.label == 'Deactive Contact');
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

    let contactData = {
      selector: 'edit-contact',
      header: 'Edit Contact',
      content: cloneData,
      buttons: [
        {
          label: 'Save',
          btnClass: 'btn-primary',
          action: function() {
            if(cloneData.contact && cloneData.email !== '' && cloneData.firstName !== '' && cloneData.lastName !== '') {
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
              alert('All fields are mandatory!');
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
}
