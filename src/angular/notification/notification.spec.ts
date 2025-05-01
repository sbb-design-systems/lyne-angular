import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNotification } from './notification';

describe('sbb-notification', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should close without throwing', async () => {
    await Promise.resolve();
    component.notification().close();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(() => (component.notification().titleContent = 'new Title')).not.toThrow();
  });
});

@Component({
  template: `<sbb-notification titleContent="test">Content</sbb-notification>`,
  imports: [SbbNotification],
})
class TestComponent {
  notification = viewChild.required(SbbNotification);
}
