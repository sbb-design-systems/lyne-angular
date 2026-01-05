import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { SbbTab } from '@sbb-esta/lyne-angular/tabs';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';

import { SbbTabsModule } from '../tabs.module';

describe(`sbb-tab-content`, () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should load tabs eagerly and lazily', async () => {
    const eagerTabElement = (fixture.nativeElement as HTMLElement).querySelector('#eager')!;
    const lazyTabElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(eagerTabElement.textContent).toEqual('Eager content');
    expect(lazyTabElement.textContent).toEqual('');
    const lazyTabLabelElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#lazy-label',
    )! as SbbTabLabelElement;
    lazyTabLabelElement.click();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(lazyTabElement.textContent).toEqual('Lazy content');
  });

  it('should accept replaced lazy content', async () => {
    const lazyTabElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyTabLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbTabLabelElement>('#lazy-label')!;
    lazyTabLabelElement.click();
    fixture.detectChanges();
    expect(lazyTabElement.textContent).toEqual('Lazy content');

    fixture.componentInstance.replaceLazyContent.set(true);
    fixture.detectChanges();

    expect(lazyTabElement.textContent).toEqual('Replaced Lazy');
  });

  it('should accept null', async () => {
    const lazyTabElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyTabLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbTabLabelElement>('#lazy-label')!;
    lazyTabLabelElement.click();
    fixture.detectChanges();
    expect(lazyTabElement.textContent).toEqual('Lazy content');

    fixture.componentInstance.showContent.set(false);
    fixture.detectChanges();

    expect(lazyTabElement.textContent).toEqual('');
  });

  it('should avoid rendering on second activation', async () => {
    const lazyTab = fixture.debugElement.query(By.css('#lazy'));

    const lazyTabElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyTabLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbTabLabelElement>('#lazy-label')!;
    lazyTabLabelElement.click();
    fixture.detectChanges();
    expect(lazyTabElement.textContent).toEqual('Lazy content');
    const contentPortal = (lazyTab.componentInstance as SbbTab).contentPortal;

    const eagerTabLabel = (fixture.nativeElement as HTMLElement).querySelector<SbbTabLabelElement>(
      '#eager-label',
    )!;
    eagerTabLabel.click();
    fixture.detectChanges();

    lazyTabLabelElement.click();
    fixture.detectChanges();

    expect((lazyTab.componentInstance as SbbTab).contentPortal).toBe(contentPortal);
  });

  it('should update template changed of lazy tabs', async () => {
    const lazyTabElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    const lazyTabLabelElement = (
      fixture.nativeElement as HTMLElement
    ).querySelector<SbbTabLabelElement>('#lazy-label')!;
    lazyTabLabelElement.click();
    fixture.detectChanges();
    expect(lazyTabElement.textContent).toEqual('Lazy content');

    fixture.componentInstance.content.set('Replaced Lazy');
    fixture.detectChanges();

    expect(lazyTabElement.textContent).toEqual('Replaced Lazy content');
  });
});

@Component({
  template: `
    <sbb-tab-group>
      <sbb-tab-label active id="eager-label">Eager loading</sbb-tab-label>
      <sbb-tab id="eager">Eager content</sbb-tab>
      <sbb-tab-label id="lazy-label">Lazy loading</sbb-tab-label>
      <sbb-tab id="lazy">
        @if (showContent()) {
          @if (replaceLazyContent()) {
            <ng-template sbbTabContent>Replaced Lazy</ng-template>
          } @else {
            <ng-template sbbTabContent>{{ content() }} content</ng-template>
          }
        }
      </sbb-tab>
    </sbb-tab-group>
  `,
  imports: [SbbTabsModule],
})
class TestComponent {
  replaceLazyContent = signal(false);
  showContent = signal(true);
  content = signal('Lazy');
}
