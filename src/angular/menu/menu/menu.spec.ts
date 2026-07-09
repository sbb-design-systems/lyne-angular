import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';

import { SbbMenu } from './menu';

describe('sbb-menu', () => {
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
    let fixture: ComponentFixture<TestSbbMenuTrigger>, component: TestSbbMenuTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbMenuTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('menu should open when correctly connected', async () => {
      expect(component.menu().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.click();
      expect(component.menu().isOpen).toBe(true);
    });
  });
});

@Component({
  template: `<sbb-menu></sbb-menu>`,
  imports: [SbbMenu],
})
class TestComponent {}

@Component({
  template: `
    <sbb-secondary-button [sbbMenuTrigger]="menu">Open Menu</sbb-secondary-button>
    <sbb-menu #menu="sbbMenu">
      <sbb-menu-button>Action</sbb-menu-button>
    </sbb-menu>
  `,
  imports: [SbbMenuModule, SbbButtonModule],
})
class TestSbbMenuTrigger {
  menu = viewChild.required(SbbMenu);
}
