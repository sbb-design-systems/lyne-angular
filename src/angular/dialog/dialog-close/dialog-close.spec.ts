import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDialogClose } from './dialog-close';

describe(`sbb-dialog-close`, () => {
  describe('attribute usage', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(
        fixture.nativeElement.querySelector('button').hasAttribute('sbb-dialog-close'),
      ).toBeTrue();
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
        fixture.nativeElement.querySelector('sbb-test-button').hasAttribute('sbb-dialog-close'),
      ).toBeTrue();
    });
  });
});

@Component({
  template: `<button sbb-dialog-close>Label</button>`,
  imports: [SbbDialogClose],
})
class TestComponent {}

@Component({
  selector: 'sbb-test-button',
  template: `<ng-content></ng-content>`,
  hostDirectives: [SbbDialogClose],
})
class TestComponentWithHostDirective {}

@Component({
  template: `<sbb-test-button>Label</sbb-test-button>`,
  imports: [TestComponentWithHostDirective],
})
class TestComponentWithHostDirectiveApplied {}
