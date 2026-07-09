import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';

import { SbbNavigation } from './navigation';
import { SbbNavigationTrigger } from './navigation-trigger';

describe('sbb-navigation', () => {
  describe('basic usage', () => {
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

  describe('standalone usage with trigger', () => {
    let fixture: ComponentFixture<TestSbbNavigationTrigger>, component: TestSbbNavigationTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbNavigationTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('navigation should open when correctly connected', async () => {
      expect(component.navigation().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.click();
      expect(component.navigation().isOpen).toBe(true);
    });
  });
});

@Component({
  template: `<sbb-navigation></sbb-navigation>`,
  imports: [SbbNavigation],
})
class TestComponent {}

@Component({
  template: `
    <sbb-secondary-button [sbbNavigationTrigger]="navigation">Open Navigation</sbb-secondary-button>
    <sbb-navigation #navigation="sbbNavigation"></sbb-navigation>
  `,
  imports: [SbbNavigation, SbbNavigationTrigger, SbbButtonModule],
})
class TestSbbNavigationTrigger {
  navigation = viewChild.required(SbbNavigation);
}
