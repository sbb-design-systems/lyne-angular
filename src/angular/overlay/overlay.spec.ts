import { OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
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

import { SbbOverlay } from './overlay';
import { SbbOverlayRef } from './overlay-ref';
import { SbbOverlayService } from './overlay-service';

describe('sbb-overlay', () => {
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
      service: SbbOverlayService,
      overlayContainerElement: HTMLElement,
      mockLocation: SpyLocation;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceTestComponent, SbbDummyComponent, TestComponent],
        providers: [{ provide: Location, useClass: SpyLocation }, SbbOverlayService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTestComponent);
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
      service = TestBed.inject(SbbOverlayService);
      mockLocation = TestBed.inject(Location) as SpyLocation;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('renders component', async () => {
      const ref = service.open<SbbDummyComponent>(SbbDummyComponent, {
        data: { dummyText: 'test string' },
        id: 'overlay-component',
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
        id: 'overlay-template',
      });
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('test string');

      expect(ref.componentInstance).toBeUndefined();
    });

    it('should emit when overlay opening animation is complete', async () => {
      const spy = vi.fn();
      const overlayRef = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });

      // As the animation is disabled in tests, the afterOpen event is emitted immediately.
      // When subscribing, the stream is already completed.
      overlayRef.afterOpened.subscribe({ complete: spy });

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      overlayRef.close();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit before and after overlay closing animation', async () => {
      const beforeCloseSpy = vi.fn();
      const afterCloseSpy = vi.fn();
      const ref = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });
      ref.beforeClosed.subscribe(beforeCloseSpy);
      ref.afterClosed.subscribe(afterCloseSpy);
      await fixture.whenRenderingDone();

      expect(service.openOverlays[0]).toBe(ref);
      ref.close();

      fixture.detectChanges();
      expect(beforeCloseSpy).toHaveBeenCalled();
      expect(service.openOverlays.length).toBe(0);
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
        'Expected the overlay component to be created with the injector from the viewContainerRef.',
      ).toBeTruthy();
    });

    it('should dispose of overlay after close', async () => {
      const ref = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
        id: 'disposed-overlay',
      });
      await fixture.whenRenderingDone();

      expect(overlayContainerElement.querySelector('#disposed-overlay')).toBeDefined();

      ref.close();
      fixture.detectChanges();
      fixture.destroy();

      expect(overlayContainerElement.querySelector('#disposed-overlay')).toBeNull();
    });

    it('should allow the consumer to disable closing a dialog on navigation', async () => {
      service.open(SbbDummyComponent);
      service.open(SbbDummyComponent, { closeOnNavigation: false });

      await fixture.whenRenderingDone();

      expect(overlayContainerElement.children.length).toBe(2);

      mockLocation.simulateUrlPop('');
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(overlayContainerElement.children.length).toBe(1);
    });
  });
});

@Component({
  template: `<sbb-overlay></sbb-overlay>`,
  imports: [SbbOverlay],
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
  @ViewChild('templatePortalContent')
  templatePortalContent!: TemplateRef<unknown>;
  @ViewChild(DirectiveWithViewContainer)
  childWithViewContainer!: DirectiveWithViewContainer;

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
  readonly ref = inject(SbbOverlayRef);
  readonly injector = inject(Injector);
}

export interface SampleData {
  dummyText: string;
}
