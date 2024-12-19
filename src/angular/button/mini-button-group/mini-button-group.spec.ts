import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMiniButtonGroupDirective } from './mini-button-group.js';

describe('SbbMiniButtonGroupDirective', () => {
  let component: SbbMiniButtonGroupDirective;
  let fixture: ComponentFixture<SbbMiniButtonGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMiniButtonGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
