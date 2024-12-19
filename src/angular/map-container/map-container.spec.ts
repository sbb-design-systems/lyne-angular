import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMapContainerDirective } from './map-container.js';

describe('SbbMapContainerDirective', () => {
  let component: SbbMapContainerDirective;
  let fixture: ComponentFixture<SbbMapContainerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMapContainerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
