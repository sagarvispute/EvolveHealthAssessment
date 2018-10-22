
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OutsideClickDirective } from './outside-click.directive';
import { ElementRef } from '@angular/core';

describe('OutsideClickDirective', () => {
  /* beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        //more providers
        { provide: ElementRef }
      ]
    }).compileComponents();
  })); */

  it('should create an instance', () => {
    //const directive = new OutsideClickDirective();
    expect(OutsideClickDirective).toBeTruthy();
  });
});
