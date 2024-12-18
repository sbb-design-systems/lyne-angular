import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainVerticalItemDirective } from './pearl-chain-vertical-item.js';

describe('SbbPearlChainVerticalItemDirective', () => {
  let component: SbbPearlChainVerticalItemDirective;
  let fixture: ComponentFixture<SbbPearlChainVerticalItemDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPearlChainVerticalItemDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
