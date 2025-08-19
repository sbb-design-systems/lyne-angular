import { Component, ElementRef, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { SbbBreadcrumbElement } from '@sbb-esta/lyne-elements/breadcrumb/breadcrumb.js';

import { SbbBreadcrumbGroup, SbbBreadcrumb } from '..';

describe('sbb-breadcrumb-group', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();

    // A simple test to check whether the hierarchy configures itself
    expect(component.breadcrumbs().every((b) => b.nativeElement.hasAttribute('slot')));
  });
});

@Component({
  template: `<sbb-breadcrumb-group>
    <sbb-breadcrumb href="https://example.com/home" iconName="house-small"></sbb-breadcrumb>
    <sbb-breadcrumb href="https://example.com/one">One</sbb-breadcrumb>
    <sbb-breadcrumb href="https://example.com/two">Two</sbb-breadcrumb>
  </sbb-breadcrumb-group>`,
  imports: [SbbBreadcrumbGroup, SbbBreadcrumb],
})
class TestComponent {
  breadcrumbs = viewChildren<ElementRef<SbbBreadcrumbElement>>(ElementRef<SbbBreadcrumbElement>);
}
