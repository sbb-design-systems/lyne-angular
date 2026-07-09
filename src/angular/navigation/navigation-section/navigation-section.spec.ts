import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';

import { SbbNavigationSection } from './navigation-section';
import { SbbNavigationSectionTrigger } from './navigation-section-trigger';

describe('sbb-navigation-section', () => {
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
    let fixture: ComponentFixture<TestSbbNavigationSectionTrigger>,
      component: TestSbbNavigationSectionTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbNavigationSectionTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('navigation section should open when correctly connected', async () => {
      expect(component.navigationSection().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.click();
      expect(component.navigationSection().isOpen).toBe(true);
    });
  });
});

@Component({
  template: `<sbb-navigation-section></sbb-navigation-section>`,
  imports: [SbbNavigationSection],
})
class TestComponent {}

@Component({
  template: `
    <sbb-secondary-button [sbbNavigationSectionTrigger]="section">
      Open Section
    </sbb-secondary-button>
    <sbb-navigation-section #section="sbbNavigationSection"></sbb-navigation-section>
  `,
  imports: [SbbNavigationSection, SbbNavigationSectionTrigger, SbbButtonModule],
})
class TestSbbNavigationSectionTrigger {
  navigationSection = viewChild.required(SbbNavigationSection);
}
