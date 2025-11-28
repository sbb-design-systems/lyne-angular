import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbIconSidebarLink } from './icon-sidebar-link';

describe('sbb-icon-sidebar-link', () => {
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
  template: `<sbb-icon-sidebar-link></sbb-icon-sidebar-link>`,
  imports: [SbbIconSidebarLink],
})
class TestComponent {}
