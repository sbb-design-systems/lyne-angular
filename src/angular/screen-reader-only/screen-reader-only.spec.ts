import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbScreenReaderOnly } from './screen-reader-only';

describe('sbb-screen-reader-only', () => {
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
  template: `<sbb-screen-reader-only></sbb-screen-reader-only>`,
  imports: [SbbScreenReaderOnly],
})
class TestComponent {}
