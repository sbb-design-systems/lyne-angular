import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbActionGroupDirective } from './action-group.js';

describe('SbbActionGroupDirective', () => {
  let component: SbbActionGroupDirective;
  let fixture: ComponentFixture<SbbActionGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbActionGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
