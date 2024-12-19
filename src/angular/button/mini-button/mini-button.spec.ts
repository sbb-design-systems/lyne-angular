import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMiniButtonDirective } from './mini-button.js';

describe('SbbMiniButtonDirective', () => {
  let component: SbbMiniButtonDirective;
  let fixture: ComponentFixture<SbbMiniButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMiniButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
