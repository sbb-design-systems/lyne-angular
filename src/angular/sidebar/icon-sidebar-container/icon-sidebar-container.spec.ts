import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbIconSidebarContainer } from './icon-sidebar-container';

describe('sbb-icon-sidebar-container', () => {
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
  template: `<sbb-icon-sidebar-container></sbb-icon-sidebar-container>`,
  imports: [SbbIconSidebarContainer],
})
class TestComponent {}
