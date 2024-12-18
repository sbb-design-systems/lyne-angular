import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbImageDirective } from './image.js';

describe('SbbImageDirective', () => {
  let component: SbbImageDirective;
  let fixture: ComponentFixture<SbbImageDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbImageDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
