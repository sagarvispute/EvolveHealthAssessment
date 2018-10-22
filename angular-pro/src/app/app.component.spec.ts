import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { confirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, ContactListComponent, MessageBoxComponent,
        ModalBoxComponent, confirmationBoxComponent, ContactFormComponent
      ],
      providers: [  ],
      imports: [ FormsModule, HttpClientModule ]
    }).compileComponents();
  }));

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
