import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbScreenReaderOnlyDirective } from './screen-reader-only.js';

describe('SbbScreenReaderOnlyDirective', () => {
  let component: SbbScreenReaderOnlyDirective;
  let fixture: ComponentFixture<SbbScreenReaderOnlyDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbScreenReaderOnlyDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
