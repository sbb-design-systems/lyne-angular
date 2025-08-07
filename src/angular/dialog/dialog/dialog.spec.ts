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
import { type SbbOverlayRef } from '@sbb-esta/lyne-angular/core/overlay';
import { SbbDummyComponent } from '@sbb-esta/lyne-angular/core/testing';

import { SbbDialog } from './dialog';
import { SbbDialogService } from './dialog-service';

describe('sbb-dialog', () => {
  describe('component renders', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be defined', async () => {
      expect(component).toBeDefined();
    });
  });

  describe('service', () => {
    let fixture: ComponentFixture<ServiceTestComponent>,
      component: ServiceTestComponent,
      service: SbbDialogService,
      overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceTestComponent, SbbDummyComponent, TestComponent],
        providers: [SbbDialogService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTestComponent);
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
      service = TestBed.inject(SbbDialogService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('renders component', async () => {
      const ref: SbbOverlayRef<SbbDummyComponent> = service.open<SbbDummyComponent>(
        SbbDummyComponent,
        {
          data: { dummyText: 'test string' },
          id: 'dialog-component',
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
        id: 'dialog-template',
      });
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('test string');

      expect(ref.componentInstance).toBeUndefined();
    });

    it('should emit when dialog opening animation is complete', async () => {
      const dialogRef = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });
      const spy = jasmine.createSpy('afterOpen spy');
      await fixture.whenRenderingDone();

      dialogRef.afterOpened().subscribe(spy);

      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      dialogRef.close();
    });

    it('should emit before and after dialog closing animation', async () => {
      const ref = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
      });
      const beforeCloseSpy = jasmine.createSpy('afterClose spy');
      const afterCloseSpy = jasmine.createSpy('afterClose spy');
      ref.beforeClosed().subscribe(beforeCloseSpy);
      ref.afterClosed().subscribe(afterCloseSpy);
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
          'Expected the dialog component to be created with the injector from the viewContainerRef.',
        )
        .toBeTruthy();
    });

    it('should dispose of dialog after close', async () => {
      const dialogRef = service.open(SbbDummyComponent, {
        viewContainerRef: component.childViewContainer,
        data: { dummyText: 'test string' },
        id: 'disposed-dialog',
      });
      await fixture.whenRenderingDone();

      expect(overlayContainerElement.querySelector('#disposed-dialog')).toBeDefined();

      dialogRef.close();
      fixture.detectChanges();
      fixture.destroy();

      expect(overlayContainerElement.querySelector('#disposed-dialog')).toBeNull();
    });
  });
});

@Component({
  template: `<sbb-dialog></sbb-dialog>`,
  imports: [SbbDialog],
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
