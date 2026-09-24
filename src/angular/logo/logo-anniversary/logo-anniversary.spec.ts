import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLogoAnniversary } from './logo-anniversary';

describe('sbb-logo-anniversary', () => {
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
  template: `<sbb-logo-anniversary></sbb-logo-anniversary>`,
  imports: [SbbLogoAnniversary],
})
class TestComponent {}
