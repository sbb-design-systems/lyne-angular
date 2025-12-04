import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbIconSidebar } from './icon-sidebar';

describe('sbb-icon-sidebar', () => {
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
  template: `<sbb-icon-sidebar></sbb-icon-sidebar>`,
  imports: [SbbIconSidebar],
})
class TestComponent {}
