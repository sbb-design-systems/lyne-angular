import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBreadcrumbDirective } from './breadcrumb.js';

describe('SbbBreadcrumbDirective', () => {
  let component: SbbBreadcrumbDirective;
  let fixture: ComponentFixture<SbbBreadcrumbDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbBreadcrumbDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
