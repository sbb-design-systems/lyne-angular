import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTagGroupDirective } from './tag-group.js';

describe('SbbTagGroupDirective', () => {
  let component: SbbTagGroupDirective;
  let fixture: ComponentFixture<SbbTagGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTagGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
