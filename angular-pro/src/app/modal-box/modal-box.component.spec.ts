import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ModalBoxComponent } from './modal-box.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

describe('ModalBoxComponent', () => {
  let component: ModalBoxComponent;
  let fixture: ComponentFixture<ModalBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBoxComponent, ContactFormComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
