import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTitleDirective } from './title.js';

describe('SbbTitleDirective', () => {
  let component: SbbTitleDirective;
  let fixture: ComponentFixture<SbbTitleDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTitleDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
