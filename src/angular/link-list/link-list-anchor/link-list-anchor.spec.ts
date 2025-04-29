import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLinkListAnchor } from './link-list-anchor';

describe('sbb-link-list-anchor', () => {
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
  template: `<sbb-link-list-anchor></sbb-link-list-anchor>`,
  imports: [SbbLinkListAnchor],
})
class TestComponent {}
