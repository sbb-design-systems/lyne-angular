import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainWagonLink } from './train-wagon-link';

describe('sbb-train-wagon-link', () => {
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
  template: `<sbb-train-wagon-link></sbb-train-wagon-link>`,
  imports: [SbbTrainWagonLink],
})
class TestComponent {}
