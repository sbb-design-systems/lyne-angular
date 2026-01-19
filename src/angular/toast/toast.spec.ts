import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  Directive,
  inject,
  Injector,
  type TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbToast } from './toast';
import { SbbToastRef } from './toast-ref';
import { SbbToastService } from './toast-service';

describe('sbb-toast', () => {
  describe('component renders', () => {
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

  describe('service', () => {
    let fixture: ComponentFixture<ServiceTestComponent>,
      component: ServiceTestComponent,
      service: SbbToastService,
      overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceTestComponent, SbbDummyComponent, TestComponent],
        providers: [SbbToastService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTestComponent);
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
      service = TestBed.inject(SbbToastService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('renders component', async () => {
      const ref = service.open<SbbDummyComponent>(SbbDummyComponent, {
        data: { dummyText: 'test string' },
        id: 'toast-component',
      });

      await fixture.whenRenderingDone();

      expect(ref.componentInstance instanceof SbbDummyComponent).toBe(true);
      expect(ref.componentInstance!.data!.dummyText).toMatch('test string');
      expect(overlayContainerElement.textContent).toContain('test string');
      expect(ref.componentInstance!.ref).toBe(ref);

      fixture.detectChanges();

      ref.close();
    });

    it('renders template', async () => {
      const ref = service.open(component.templatePortalContent, {
        templateContext: { $implicit: 'test string' },
        id: 'toast-template',
      });
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('test string');

      expect(ref.componentInstance).toBeUndefined();
    });

    it('should emit when toast opening animation is complete', async () => {
      const spy = jasmine.createSpy('afterOpened spy');
      const serviceSpy = jasmine.createSpy('afterOpened spy');

      service.afterOpened.subscribe(serviceSpy);

      const toastRef = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });

      // As the animation is disabled in tests, the afterOpen event is emitted immediately.
      // When subscribing, the stream is already completed.
      toastRef.afterOpened.subscribe({ complete: spy });

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      toastRef.close();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit before and after toast closing animation', async () => {
      const ref = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });
      const beforeCloseSpy = jasmine.createSpy('beforeClosed spy');
      const afterCloseSpy = jasmine.createSpy('afterClosed spy');
      ref.beforeClosed.subscribe(beforeCloseSpy);
      ref.afterClosed.subscribe(afterCloseSpy);
      await fixture.whenRenderingDone();

      fixture.detectChanges();
      ref.close();

      fixture.detectChanges();
      expect(beforeCloseSpy).toHaveBeenCalled();
      expect(afterCloseSpy).toHaveBeenCalled();
    });

    it('should use injector from viewContainerRef', async () => {
      const ref = service.open<SbbDummyComponent>(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });

      fixture.detectChanges();

      expect(
        ref.componentInstance?.injector.get<DirectiveWithViewContainer>(DirectiveWithViewContainer),
      )
        .withContext(
          'Expected the toast component to be created with the injector from the viewContainerRef.',
        )
        .toBeTruthy();
    });

    it('should dispose of toast after close', async () => {
      const ref = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
        id: 'disposed-toast',
      });
      await fixture.whenRenderingDone();

      expect(overlayContainerElement.querySelector('#disposed-toast')).toBeDefined();

      ref.close();
      fixture.detectChanges();
      fixture.destroy();

      expect(overlayContainerElement.querySelector('#disposed-toast')).toBeNull();
    });

    it('should open toast with string', async () => {
      const spy = jasmine.createSpy('afterOpened spy');
      const serviceSpy = jasmine.createSpy('afterOpened spy');

      service.afterOpened.subscribe(serviceSpy);

      const toastRef = service.open('Test with string only');

      // As the animation is disabled in tests, the afterOpen event is emitted immediately.
      // When subscribing, the stream is already completed.
      toastRef.afterOpened.subscribe({ complete: spy });

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      expect(document.body.querySelector('.cdk-overlay-container')?.textContent).toEqual(
        'Test with string only',
      );

      toastRef.close();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
});

@Component({
  template: `<sbb-toast></sbb-toast>`,
  imports: [SbbToast],
})
class TestComponent {}

@Directive({
  selector: 'dir-with-view-container',
})
class DirectiveWithViewContainer {
  viewContainerRef = inject(ViewContainerRef);
}
@Component({
  template: `
    <ng-template #templatePortalContent let-testString>
      <p>This content was slotted as template. Dummy string: {{ testString }}.</p>
    </ng-template>
    <dir-with-view-container></dir-with-view-container>
  `,
  imports: [DirectiveWithViewContainer],
})
class ServiceTestComponent {
  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<unknown>;
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer!: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  selector: 'sbb-dummy-component',
  template: `This is a dummy component meant for testing. Dummy string: {{ data?.dummyText }}`,
})
class SbbDummyComponent {
  readonly data = inject<SampleData>(SBB_OVERLAY_DATA, { optional: true });
  readonly ref = inject(SbbToastRef);
  readonly injector = inject(Injector);
}

export interface SampleData {
  dummyText: string;
}
