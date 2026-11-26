import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBadge } from './badge';

describe(`sbb-badge`, () => {
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

    it('should toggle the disabled attribute', () => {
      const badgeElement = fixture.nativeElement.querySelector('button');

      expect(badgeElement).not.toHaveAttribute('sbb-badge-disabled');

      component.disabled.set(true);
      fixture.detectChanges();
      expect(badgeElement).toHaveAttribute('sbb-badge-disabled');

      component.disabled.set(false);
      fixture.detectChanges();
      expect(badgeElement).not.toHaveAttribute('sbb-badge-disabled');
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
  template: `<button sbb-badge="99" sbb-badge-position="before" [sbb-badge-disabled]="disabled()">
    Label
  </button>`,
  imports: [SbbBadge],
})
class TestComponent {
  disabled = signal(false);
}

@Component({
  selector: 'sbb-test-button',
  template: `<ng-content></ng-content>`,
  hostDirectives: [
    {
      directive: SbbBadge,
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
