import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { confirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AppServiceService } from './app-service.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let contactList = [
    {
        _id: "5bcb7848041fe411401a1e75",
        contact: 1245454545,
        email: "sagar@gmail.com",
        firstName: "sagar",
        lastName: "vispute",
        status: false
    },
    {
        _id: "5bcb9bdd575c752ef4993468",
        contact: 8856658150,
        email: "prasad@gmail.com",
        firstName: "ashish",
        lastName: "patil",
        status: false,
        checked: false
    },
    {
        _id: "5bcb9cbe575c752ef4993469",
        contact: 7845879450,
        email: "amod@gmail.com",
        firstName: "amod ",
        lastName: "tiwari",
        status: false,
        checked: false
    },
    {
        _id: "5bcc2a25575c752ef499346c",
        contact: 5458455569,
        email: "sagar@gmail.co",
        firstName: "sandy",
        lastName: "art",
        status: false,
        checked: false
    },
    {
        _id: "5bcc2c9d575c752ef499346d",
        contact: 25451545445,
        email: "ranjitkhairnar33@gmail.com",
        firstName: "ranjit",
        lastName: "khairnar",
        status: false
    }
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, ContactListComponent, MessageBoxComponent,
        ModalBoxComponent, confirmationBoxComponent, ContactFormComponent
      ],
      providers: [  ],
      imports: [ FormsModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoxComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render Contacts in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Contacts');
  }));
});
