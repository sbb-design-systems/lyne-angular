import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTeaserProductStatic } from './teaser-product-static';

describe('sbb-teaser-product-static', () => {
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
  template: `<sbb-teaser-product-static></sbb-teaser-product-static>`,
  imports: [SbbTeaserProductStatic],
})
class TestComponent {}
