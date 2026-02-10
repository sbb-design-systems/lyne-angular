import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import type { SbbSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';
import type { SbbSidebarElement } from '@sbb-esta/lyne-elements/sidebar/sidebar.js';

import { SbbSidebarModule } from '..';

describe('sbb-sidebar', () => {
  let containerElement: SbbSidebarContainerElement, sidebarElement: SbbSidebarElement;

  describe('', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      containerElement = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-sidebar-container',
      )!;
      sidebarElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-sidebar')!;
    });

    it('should create', async () => {
      fixture.detectChanges();
      expect(component).toBeDefined();
    });

    it('should have animation deferred', async () => {
      expect(containerElement.classList.contains('sbb-disable-animation')).toBe(true);
      await waitForLitRender(sidebarElement);
      await fixture.whenStable();
      expect(containerElement.classList.contains('sbb-disable-animation')).toBe(false);
    });
  });

  describe('with disabled animation class', () => {
    let fixture: ComponentFixture<TestComponentWithDisabledAnimation>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentWithDisabledAnimation);
      containerElement = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-sidebar-container',
      )!;
      sidebarElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-sidebar')!;
      fixture.detectChanges();
    });

    it('should not remove sbb-disable-animation class if it is already applied', async () => {
      expect(containerElement.classList.contains('sbb-disable-animation')).toBe(true);
      await waitForLitRender(sidebarElement);
      expect(containerElement.classList.contains('sbb-disable-animation')).toBe(true);
    });
  });
});

@Component({
  template: `<div class="sbb-enable-animation">
    <sbb-sidebar-container>
      <sbb-sidebar [opened]="true"></sbb-sidebar>
      <sbb-sidebar-content (transitionend)="transitionend()"></sbb-sidebar-content>
    </sbb-sidebar-container>
  </div>`,
  imports: [SbbSidebarModule],
})
class TestComponent {
  transitionend() {
    throw new Error('transitionend event should not be triggered');
  }
}

@Component({
  template: `<sbb-sidebar-container class="sbb-disable-animation">
    <sbb-sidebar [opened]="true"></sbb-sidebar>
    <sbb-sidebar-content></sbb-sidebar-content>
  </sbb-sidebar-container>`,
  imports: [SbbSidebarModule],
})
class TestComponentWithDisabledAnimation {}
