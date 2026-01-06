import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFocusInitial } from './focus-initial';

describe(`sbb-focus-initial`, () => {
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
        fixture.nativeElement.querySelector('button').hasAttribute('sbb-focus-initial'),
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
        fixture.nativeElement.querySelector('sbb-test-button').hasAttribute('sbb-focus-initial'),
      ).toBeTrue();
    });
  });
});

@Component({
  template: `<button sbb-focus-initial>Label</button>`,
  imports: [SbbFocusInitial],
})
class TestComponent {}

@Component({
  selector: 'sbb-test-button',
  template: `<ng-content></ng-content>`,
  hostDirectives: [SbbFocusInitial],
})
class TestComponentWithHostDirective {}

@Component({
  template: `<sbb-test-button>Label</sbb-test-button>`,
  imports: [TestComponentWithHostDirective],
})
class TestComponentWithHostDirectiveApplied {}
