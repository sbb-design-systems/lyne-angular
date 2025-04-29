import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainBlockedPassage } from './train-blocked-passage';

describe('sbb-train-blocked-passage', () => {
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
  template: `<sbb-train-blocked-passage></sbb-train-blocked-passage>`,
  imports: [SbbTrainBlockedPassage],
})
class TestComponent {}
