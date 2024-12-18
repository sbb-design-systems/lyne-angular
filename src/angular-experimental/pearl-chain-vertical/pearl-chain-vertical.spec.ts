import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainVerticalDirective } from './pearl-chain-vertical.js';

describe('SbbPearlChainVerticalDirective', () => {
  let component: SbbPearlChainVerticalDirective;
  let fixture: ComponentFixture<SbbPearlChainVerticalDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPearlChainVerticalDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
