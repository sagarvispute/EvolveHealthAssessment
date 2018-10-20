import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { confirmationBoxComponent } from './confirmation-box.component';

describe('confirmationBoxComponent', () => {
  let component: confirmationBoxComponent;
  let fixture: ComponentFixture<confirmationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ confirmationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(confirmationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
