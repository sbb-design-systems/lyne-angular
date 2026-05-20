import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainWagonButton } from './train-wagon-button';

describe('sbb-train-wagon-button', () => {
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
  template: `<sbb-train-wagon-button></sbb-train-wagon-button>`,
  imports: [SbbTrainWagonButton],
})
class TestComponent {}
