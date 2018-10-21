import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { confirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { appInterceptor } from './app-interceptor';
import { OutsideClickDirective } from './directives/outside-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    ModalBoxComponent,
    MessageBoxComponent,
    ContactListComponent,
    ContactFormComponent,
    confirmationBoxComponent,
    OutsideClickDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: appInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
