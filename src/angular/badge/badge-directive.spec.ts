import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBadgeDirective } from './badge-directive';

describe(`sbb-badge-directive`, () => {
  describe('attribute usage', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(fixture.nativeElement.querySelector('button').getAttribute('sbb-badge')).toBe('99');
      expect(fixture.nativeElement.querySelector('button').getAttribute('sbb-badge-position')).toBe(
        'before',
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
      expect(fixture.nativeElement.querySelector('sbb-test-button').getAttribute('sbb-badge')).toBe(
        '99',
      );
    });
  });
});

@Component({
  template: `<button sbb-badge="99" sbb-badge-position="before">Label</button>`,
  imports: [SbbBadgeDirective],
})
class TestComponent {}

@Component({
  selector: 'sbb-test-button',
  template: `<ng-content></ng-content>`,
  hostDirectives: [
    {
      directive: SbbBadgeDirective,
      inputs: ['sbb-badge: content'],
    },
  ],
})
class TestComponentWithHostDirective {}

@Component({
  template: `<sbb-test-button content="99">Label</sbb-test-button>`,
  imports: [TestComponentWithHostDirective],
})
class TestComponentWithHostDirectiveApplied {}
