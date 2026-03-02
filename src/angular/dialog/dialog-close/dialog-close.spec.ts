import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog/dialog.js';

import { SbbDialogService } from '../dialog/dialog-service';
import { SbbDialogModule } from '../dialog.module';

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
      expect(fixture.nativeElement.querySelector('button').hasAttribute('sbb-dialog-close')).toBe(
        true,
      );
    });
  });

  describe('dialog service integration', () => {
    let fixture: ComponentFixture<ServiceTestComponent>,
      service: SbbDialogService,
      overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceTestComponent, DialogContentWithResultValue],
        providers: [SbbDialogService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTestComponent);
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
      service = TestBed.inject(SbbDialogService);
      fixture.detectChanges();
    });

    it('should pass result value when closing dialog', async () => {
      const ref = service.open<DialogContentWithResultValue, boolean>(DialogContentWithResultValue);

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      let resultValue: SbbDialogCloseEvent<boolean>;
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

    it('should pass dynamic result value when closing dialog', async () => {
      const ref = service.open<DialogContentWithResultValue, string>(DialogContentWithResultValue);

      await fixture.whenRenderingDone();
      fixture.detectChanges();
      await fixture.whenStable();

      // Update the result value
      ref.componentInstance!.resultValue.set('updated-result');
      await fixture.whenStable();

      let resultValue: SbbDialogCloseEvent<string>;
      ref.afterClosed.subscribe((result) => (resultValue = result));

      const dynamicButton = overlayContainerElement.querySelector(
        'button.dynamic-value',
      ) as HTMLButtonElement;
      dynamicButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(resultValue!.result).toBe('updated-result');
      expect(service.openOverlays.length).toBe(0);
    });

    it('should close dialog without result value', async () => {
      const ref = service.open<DialogContentWithResultValue, string>(DialogContentWithResultValue);

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      let resultValue: SbbDialogCloseEvent<string>;
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
        fixture.nativeElement.querySelector('sbb-test-button').hasAttribute('sbb-dialog-close'),
      ).toBe(true);
    });
  });
});

@Component({
  template: `<button sbb-dialog-close>Label</button>`,
  imports: [SbbDialogClose],
})
class TestComponent {}

@Component({
  template: `<div>Service Test Component</div>`,
})
class ServiceTestComponent {}

@Component({
  template: `
    <sbb-dialog-title>Title</sbb-dialog-title>
    <sbb-dialog-content>Choose!</sbb-dialog-content>
    <sbb-dialog-actions>
      <button [sbb-dialog-close]="true" class="confirm-button">Confirm</button>
      <button [sbb-dialog-close]="resultValue()" class="dynamic-value">Dynamic value</button>
      <button sbb-dialog-close class="cancel-button">Cancel</button>
    </sbb-dialog-actions>
  `,
  imports: [SbbDialogModule],
})
class DialogContentWithResultValue {
  resultValue = signal('initial-result');
}

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
