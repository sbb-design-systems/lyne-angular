import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbIconSidebarContent } from './icon-sidebar-content';

describe('sbb-icon-sidebar-content', () => {
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
  template: `<sbb-icon-sidebar-content></sbb-icon-sidebar-content>`,
  imports: [SbbIconSidebarContent],
})
class TestComponent {}
