import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbHeaderScrollOrigin } from './header-scroll-origin';

describe(`sbb-header-scroll-origin`, () => {
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
        fixture.nativeElement.querySelector('div').hasAttribute('sbb-header-scroll-origin'),
      ).toBe(true);
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
        fixture.nativeElement
          .querySelector('sbb-test-div')
          .hasAttribute('sbb-header-scroll-origin'),
      ).toBe(true);
    });
  });
});

@Component({
  template: `<div sbb-header-scroll-origin>Label</div>`,
  imports: [SbbHeaderScrollOrigin],
})
class TestComponent {}

@Component({
  selector: 'sbb-test-div',
  template: `<ng-content></ng-content>`,
  hostDirectives: [SbbHeaderScrollOrigin],
})
class TestComponentWithHostDirective {}

@Component({
  template: `<sbb-test-div>Label</sbb-test-div>`,
  imports: [TestComponentWithHostDirective],
})
class TestComponentWithHostDirectiveApplied {}
