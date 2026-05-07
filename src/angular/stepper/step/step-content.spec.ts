import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper.pure.js';

import { SbbStepperModule } from '../stepper.module';

import type { SbbStep } from './step';

describe(`sbb-step-content`, () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should load steps eagerly and lazily', async () => {
    const eagerStepElement = (fixture.nativeElement as HTMLElement).querySelector('#eager')!;
    const lazyStepElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(eagerStepElement.textContent).toEqual('Eager content');
    expect(lazyStepElement.textContent).toEqual('');
    const lazyStepLabelElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#lazy-label',
    )! as SbbStepLabelElement;
    lazyStepLabelElement.click();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(lazyStepElement.textContent).toEqual('Lazy content');
  });

  it('should accept replaced lazy content', async () => {
    const lazyStepElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyStepLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbStepLabelElement>('#lazy-label')!;
    lazyStepLabelElement.click();
    fixture.detectChanges();
    expect(lazyStepElement.textContent).toEqual('Lazy content');

    fixture.componentInstance.replaceLazyContent.set(true);
    fixture.detectChanges();

    expect(lazyStepElement.textContent).toEqual('Replaced Lazy');
  });

  it('should accept null', async () => {
    const lazyStepElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyStepLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbStepLabelElement>('#lazy-label')!;
    lazyStepLabelElement.click();
    fixture.detectChanges();
    expect(lazyStepElement.textContent).toEqual('Lazy content');

    fixture.componentInstance.showContent.set(false);
    fixture.detectChanges();

    expect(lazyStepElement.textContent).toEqual('');
  });

  it('should avoid rendering on second activation', async () => {
    const lazyStep = fixture.debugElement.query(By.css('#lazy'));

    const lazyStepElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyStepLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbStepLabelElement>('#lazy-label')!;
    lazyStepLabelElement.click();
    fixture.detectChanges();
    expect(lazyStepElement.textContent).toEqual('Lazy content');
    const contentPortal = (lazyStep.componentInstance as SbbStep)['contentPortal'];

    const eagerStepLabel = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbStepLabelElement>('#eager-label')!;
    eagerStepLabel.click();
    fixture.detectChanges();

    lazyStepLabelElement.click();
    fixture.detectChanges();

    expect((lazyStep.componentInstance as SbbStep)['contentPortal']).toBe(contentPortal);
  });

  it('should update template changed of lazy steps', async () => {
    const lazyStepElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyStepLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbStepLabelElement>('#lazy-label')!;
    lazyStepLabelElement.click();
    fixture.detectChanges();
    expect(lazyStepElement.textContent).toEqual('Lazy content');

    fixture.componentInstance.content.set('Replaced Lazy');
    fixture.detectChanges();

    expect(lazyStepElement.textContent).toEqual('Replaced Lazy content');
  });
});

@Component({
  template: `
    <sbb-stepper>
      <sbb-step-label active id="eager-label">Eager loading</sbb-step-label>
      <sbb-step id="eager">Eager content</sbb-step>
      <sbb-step-label id="lazy-label">Lazy loading</sbb-step-label>
      <sbb-step id="lazy">
        @if (showContent()) {
          @if (replaceLazyContent()) {
            <ng-template sbbStepContent>Replaced Lazy</ng-template>
          } @else {
            <ng-template sbbStepContent>{{ content() }} content</ng-template>
          }
        }
      </sbb-step>
    </sbb-stepper>
  `,
  imports: [SbbStepperModule],
})
class TestComponent {
  replaceLazyContent = signal(false);
  showContent = signal(true);
  content = signal('Lazy');
}
