import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTabNavBar } from './tab-nav-bar';

describe('sbb-tab-nav-bar', () => {
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
  template: `<sbb-tab-nav-bar></sbb-tab-nav-bar>`,
  imports: [SbbTabNavBar],
})
class TestComponent {}
