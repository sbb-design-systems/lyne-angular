import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbButtonStaticDirective } from './button-static.js';

describe('SbbButtonStaticDirective', () => {
  let component: SbbButtonStaticDirective;
  let fixture: ComponentFixture<SbbButtonStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbButtonStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
