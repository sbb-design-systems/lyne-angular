import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBreadcrumbGroupDirective } from './breadcrumb-group.js';

describe('SbbBreadcrumbGroupDirective', () => {
  let component: SbbBreadcrumbGroupDirective;
  let fixture: ComponentFixture<SbbBreadcrumbGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbBreadcrumbGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
