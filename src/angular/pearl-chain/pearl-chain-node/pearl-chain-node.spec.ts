import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainNode } from './pearl-chain-node';

describe('sbb-pearl-chain-node', () => {
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
  template: `<sbb-pearl-chain-node></sbb-pearl-chain-node>`,
  imports: [SbbPearlChainNode],
})
class TestComponent {}
