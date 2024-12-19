import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCompactPaginatorDirective } from './compact-paginator.js';

describe('SbbCompactPaginatorDirective', () => {
  let component: SbbCompactPaginatorDirective;
  let fixture: ComponentFixture<SbbCompactPaginatorDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCompactPaginatorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
