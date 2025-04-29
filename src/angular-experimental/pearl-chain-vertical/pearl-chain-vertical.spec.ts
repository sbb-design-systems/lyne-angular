import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainVertical } from './pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
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
  template: `<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`,
  imports: [SbbPearlChainVertical],
})
class TestComponent {}
