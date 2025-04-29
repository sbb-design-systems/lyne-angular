import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTransparentButtonStatic } from './transparent-button-static';

describe('sbb-transparent-button-static', () => {
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
  template: `<sbb-transparent-button-static></sbb-transparent-button-static>`,
  imports: [SbbTransparentButtonStatic],
})
class TestComponent {}
