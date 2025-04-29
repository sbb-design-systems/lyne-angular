import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBreadcrumbGroup } from './breadcrumb-group';

describe('sbb-breadcrumb-group', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-breadcrumb-group></sbb-breadcrumb-group>`,
  imports: [SbbBreadcrumbGroup],
})
class TestComponent {}
