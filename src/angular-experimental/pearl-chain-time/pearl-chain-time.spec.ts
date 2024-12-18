import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainTimeDirective } from './pearl-chain-time.js';

describe('SbbPearlChainTimeDirective', () => {
  let component: SbbPearlChainTimeDirective;
  let fixture: ComponentFixture<SbbPearlChainTimeDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPearlChainTimeDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
