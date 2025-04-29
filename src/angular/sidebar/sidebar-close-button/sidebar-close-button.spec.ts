import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSidebarCloseButton } from './sidebar-close-button';

describe('sbb-sidebar-close-button', () => {
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
  template: `<sbb-sidebar-close-button></sbb-sidebar-close-button>`,
  imports: [SbbSidebarCloseButton],
})
class TestComponent {}
