import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLogoCargoInternational } from './logo-cargo-international';

describe('sbb-logo-cargo-international', () => {
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
  template: `<sbb-logo-cargo-international></sbb-logo-cargo-international>`,
  imports: [SbbLogoCargoInternational],
})
class TestComponent {}
