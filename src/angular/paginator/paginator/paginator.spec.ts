import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPaginatorDirective } from './paginator.js';

describe('SbbPaginatorDirective', () => {
  let component: SbbPaginatorDirective;
  let fixture: ComponentFixture<SbbPaginatorDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPaginatorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
