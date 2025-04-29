import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSecondaryButtonStatic } from './secondary-button-static';

describe('sbb-secondary-button-static', () => {
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
  template: `<sbb-secondary-button-static></sbb-secondary-button-static>`,
  imports: [SbbSecondaryButtonStatic],
})
class TestComponent {}
