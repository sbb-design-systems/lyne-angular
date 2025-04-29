import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbIconSidebarContentElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar-content.js';

import { SbbIconSidebarContent } from './icon-sidebar-content';

describe('sbb-icon-sidebar-content', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbIconSidebarContentElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-icon-sidebar-content');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-icon-sidebar-content',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-icon-sidebar-content></sbb-icon-sidebar-content>`,
  imports: [SbbIconSidebarContent],
})
class TestComponent {}
