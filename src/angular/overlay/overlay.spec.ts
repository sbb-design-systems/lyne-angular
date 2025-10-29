import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  Directive,
  inject,
  type TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { SbbOverlayRef } from '@sbb-esta/lyne-angular/core/overlay';
import { SbbDummyComponent } from '@sbb-esta/lyne-angular/core/testing';

import { SbbOverlay } from './overlay';
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
      overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceTestComponent, SbbDummyComponent, TestComponent],
        providers: [SbbOverlayService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTestComponent);
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
      service = TestBed.inject(SbbOverlayService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('renders component', async () => {
      const ref: SbbOverlayRef<SbbDummyComponent> = service.open<SbbDummyComponent>(
        SbbDummyComponent,
        {
          data: { dummyText: 'test string' },
          id: 'overlay-component',
        },
      );

      await fixture.whenRenderingDone();

      expect(ref.componentInstance instanceof SbbDummyComponent).toBe(true);
      expect(ref.componentInstance!.data.dummyText).toMatch('test string');
      expect(overlayContainerElement.textContent).toContain('test string');
      expect(ref.componentInstance!.ref).toBe(ref);

      fixture.detectChanges();

      ref.close();
    });

    it('renders template', async () => {
      const ref: SbbOverlayRef = service.open(component.templatePortalContent, {
        templateContext: { $implicit: 'test string' },
        id: 'overlay-template',
      });
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('test string');

      expect(ref.componentInstance).toBeUndefined();
    });

    // TODO: understand why next is not called in tests
    it('should emit when overlay opening animation is complete', async () => {
      const spy = jasmine.createSpy('afterOpen spy');
      const overlayRef = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });
      overlayRef.afterOpen.subscribe({ complete: spy });

      await fixture.whenRenderingDone();
      fixture.detectChanges();

      overlayRef.close();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit before and after overlay closing animation', async () => {
      const beforeCloseSpy = jasmine.createSpy('beforeClose spy');
      const afterCloseSpy = jasmine.createSpy('afterClose spy');
      const ref = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });
      ref.beforeClose.subscribe(beforeCloseSpy);
      ref.afterClose.subscribe(afterCloseSpy);
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
          'Expected the overlay component to be created with the injector from the viewContainerRef.',
        )
        .toBeTruthy();
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
  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<unknown>;
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer!: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}
