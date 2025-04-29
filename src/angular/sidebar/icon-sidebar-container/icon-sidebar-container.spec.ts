import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbIconSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar-container.js';

import { SbbIconSidebarContainer } from './icon-sidebar-container';

describe('sbb-icon-sidebar-container', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbIconSidebarContainerElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-icon-sidebar-container');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-icon-sidebar-container',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-icon-sidebar-container></sbb-icon-sidebar-container>`,
  imports: [SbbIconSidebarContainer],
})
class TestComponent {}
