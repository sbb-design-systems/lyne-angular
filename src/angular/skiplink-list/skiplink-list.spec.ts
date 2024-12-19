import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSkiplinkListDirective } from './skiplink-list.js';

describe('SbbSkiplinkListDirective', () => {
  let component: SbbSkiplinkListDirective;
  let fixture: ComponentFixture<SbbSkiplinkListDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSkiplinkListDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
