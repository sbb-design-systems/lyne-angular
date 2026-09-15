import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLogoElvetino } from './logo-elvetino';

describe('sbb-logo-elvetino', () => {
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
  template: `<sbb-logo-elvetino></sbb-logo-elvetino>`,
  imports: [SbbLogoElvetino],
})
class TestComponent {}
