import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainTime } from './pearl-chain-time';

describe('sbb-pearl-chain-time', () => {
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
  template: `<sbb-pearl-chain-time></sbb-pearl-chain-time>`,
  imports: [SbbPearlChainTime],
})
class TestComponent {}
