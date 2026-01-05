import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTab } from './tab';

describe('sbb-tab', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
    expect(fixture.nativeElement.querySelector('#content')).not.toBeNull();
  });
});

@Component({
  template: `<sbb-tab><span id="content">Content</span></sbb-tab>`,
  imports: [SbbTab],
})
class TestComponent {}
