import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbToastClose } from './toast-close';

describe(`sbb-toast-close`, () => {
  describe('attribute usage', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(fixture.nativeElement.querySelector('button').hasAttribute('sbb-toast-close')).toBe(
        true,
      );
    });
  });

  describe('host directive usage', () => {
    let fixture: ComponentFixture<TestComponentWithHostDirectiveApplied>,
      component: TestComponentWithHostDirectiveApplied;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentWithHostDirectiveApplied);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(
        fixture.nativeElement.querySelector('sbb-test-button').hasAttribute('sbb-toast-close'),
      ).toBe(true);
    });
  });
});

@Component({
  template: `<button sbb-toast-close>Label</button>`,
  imports: [SbbToastClose],
})
class TestComponent {}

@Component({
  selector: 'sbb-test-button',
  template: `<ng-content></ng-content>`,
  hostDirectives: [SbbToastClose],
})
class TestComponentWithHostDirective {}

@Component({
  template: `<sbb-test-button>Label</sbb-test-button>`,
  imports: [TestComponentWithHostDirective],
})
class TestComponentWithHostDirectiveApplied {}
