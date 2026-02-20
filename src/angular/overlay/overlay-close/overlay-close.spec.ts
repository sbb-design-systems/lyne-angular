import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { SbbOverlayCloseEvent } from '@sbb-esta/lyne-elements/overlay.js';

import { SbbOverlayService } from '../overlay-service';

import { SbbOverlayClose } from './overlay-close';

describe(`sbb-overlay-close`, () => {
  describe('attribute usage', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(fixture.nativeElement.querySelector('button').hasAttribute('sbb-overlay-close')).toBe(
        true,
      );
    });
  });

  describe('overlay service integration', () => {
    let fixture: ComponentFixture<ServiceTestComponent>,
      service: SbbOverlayService,
      overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceTestComponent, OverlayContentWithResultValue],
        providers: [SbbOverlayService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTestComponent);
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
      service = TestBed.inject(SbbOverlayService);
      fixture.detectChanges();
    });

    it('should pass result value when closing overlay', async () => {
      const ref = service.open<OverlayContentWithResultValue, boolean>(
        OverlayContentWithResultValue,
      );

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      let resultValue: SbbOverlayCloseEvent;
      ref.afterClosed.subscribe((result) => (resultValue = result));

      const confirmButton = overlayContainerElement.querySelector(
        'button.confirm-button',
      ) as HTMLButtonElement;
      confirmButton.click();
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(resultValue!.result).toBe(true);
      expect(service.openOverlays.length).toBe(0);
    });

    it('should pass dynamic result value when closing overlay', async () => {
      const ref = service.open<OverlayContentWithResultValue, string>(
        OverlayContentWithResultValue,
      );

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      // Update the result value
      ref.componentInstance!.resultValue.set('updated-result');
      fixture.detectChanges();

      let resultValue: SbbOverlayCloseEvent<string>;
      ref.afterClosed.subscribe((result) => (resultValue = result));

      const dynamicButton = overlayContainerElement.querySelector(
        'button.dynamic-value',
      ) as HTMLButtonElement;
      dynamicButton.click();
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(resultValue!.result).toBe('updated-result');
      expect(service.openOverlays.length).toBe(0);
    });

    it('should close overlay without result value', async () => {
      const ref = service.open<OverlayContentWithResultValue, string>(
        OverlayContentWithResultValue,
      );

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      let resultValue: SbbOverlayCloseEvent<string>;
      ref.afterClosed.subscribe((result) => (resultValue = result));

      const cancelButton = overlayContainerElement.querySelector(
        'button.cancel-button',
      ) as HTMLButtonElement;
      cancelButton.click();
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(!!resultValue!.result).toBe(false);
      expect(service.openOverlays.length).toBe(0);
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
        fixture.nativeElement.querySelector('sbb-test-button').hasAttribute('sbb-overlay-close'),
      ).toBe(true);
    });
  });
});

@Component({
  template: `<button sbb-overlay-close>Label</button>`,
  imports: [SbbOverlayClose],
})
class TestComponent {}

@Component({
  template: `<div>Service Test Component</div>`,
})
class ServiceTestComponent {}

@Component({
  template: `
    <button [sbb-overlay-close]="true" class="confirm-button">Confirm</button>
    <button [sbb-overlay-close]="resultValue()" class="dynamic-value">Dynamic value</button>
    <button sbb-overlay-close class="cancel-button">Cancel</button>
  `,
  imports: [SbbOverlayClose],
})
class OverlayContentWithResultValue {
  resultValue = signal('initial-result');
}

@Component({
  selector: 'sbb-test-button',
  template: `<ng-content></ng-content>`,
  hostDirectives: [SbbOverlayClose],
})
class TestComponentWithHostDirective {}

@Component({
  template: `<sbb-test-button>Label</sbb-test-button>`,
  imports: [TestComponentWithHostDirective],
})
class TestComponentWithHostDirectiveApplied {}
