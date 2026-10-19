import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainLegacy } from './pearl-chain-legacy';

describe('sbb-pearl-chain-legacy', () => {
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
  template: `<sbb-pearl-chain-legacy></sbb-pearl-chain-legacy>`,
  imports: [SbbPearlChainLegacy],
})
class TestComponent {}
