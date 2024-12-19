import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbContainerDirective } from './container.js';

describe('SbbContainerDirective', () => {
  let component: SbbContainerDirective;
  let fixture: ComponentFixture<SbbContainerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbContainerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
