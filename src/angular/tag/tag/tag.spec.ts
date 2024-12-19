import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTagDirective } from './tag.js';

describe('SbbTagDirective', () => {
  let component: SbbTagDirective;
  let fixture: ComponentFixture<SbbTagDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTagDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
