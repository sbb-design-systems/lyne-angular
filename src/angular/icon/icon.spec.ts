import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbIconDirective } from './icon.js';

describe('SbbIconDirective', () => {
  let component: SbbIconDirective;
  let fixture: ComponentFixture<SbbIconDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbIconDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
