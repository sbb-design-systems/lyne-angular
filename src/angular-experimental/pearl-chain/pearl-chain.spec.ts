import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPearlChainDirective } from './pearl-chain.js';

describe('SbbPearlChainDirective', () => {
  let component: SbbPearlChainDirective;
  let fixture: ComponentFixture<SbbPearlChainDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPearlChainDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
