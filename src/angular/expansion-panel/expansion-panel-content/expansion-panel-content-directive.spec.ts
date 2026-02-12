import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { SbbExpansionPanelElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';

import { SbbExpansionPanelModule } from '../expansion-panel.module';

describe(`sbb-expansion-panel-content-directive`, () => {
  describe(`with sbb-expansion-panel`, () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should load content eagerly and lazily', async () => {
      const eagerPanelContent = (fixture.nativeElement as HTMLElement).querySelector(
        '#eager sbb-expansion-panel-content',
      )!;
      const lazyPanelContent = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy sbb-expansion-panel-content',
      )!;
      fixture.detectChanges();
      await fixture.whenRenderingDone();
      expect(eagerPanelContent.textContent?.trim()).toEqual('Eager content');
      expect(lazyPanelContent.textContent?.trim()).toEqual('');

      const lazyPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy',
      )! as SbbExpansionPanelElement;
      lazyPanelElement.expanded = true;
      lazyPanelElement.dispatchEvent(new Event('open'));
      fixture.detectChanges();
      await fixture.whenRenderingDone();
      expect(lazyPanelContent.textContent?.trim()).toEqual('Lazy content');
    });

    it('should accept replaced lazy content', async () => {
      const lazyPanelContent = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy sbb-expansion-panel-content',
      )!;
      const lazyPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy',
      )! as SbbExpansionPanelElement;

      lazyPanelElement.expanded = true;
      lazyPanelElement.dispatchEvent(new Event('open'));
      fixture.detectChanges();
      expect(lazyPanelContent.textContent?.trim()).toEqual('Lazy content');

      fixture.componentInstance.replaceLazyContent.set(true);
      fixture.detectChanges();

      expect(lazyPanelContent.textContent?.trim()).toEqual('Replaced Lazy');
    });

    it('should accept null', async () => {
      const lazyPanelContent = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy sbb-expansion-panel-content',
      )!;
      const lazyPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy',
      )! as SbbExpansionPanelElement;

      lazyPanelElement.expanded = true;
      lazyPanelElement.dispatchEvent(new Event('open'));
      fixture.detectChanges();
      expect(lazyPanelContent.textContent?.trim()).toEqual('Lazy content');

      fixture.componentInstance.showContent.set(false);
      fixture.detectChanges();

      expect(lazyPanelContent.textContent?.trim()).toEqual('');
    });

    it('should avoid rendering on second expansion', async () => {
      const lazyPanelDebug = fixture.debugElement.query(
        By.css('#lazy sbb-expansion-panel-content'),
      );
      const lazyPanelContent = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy sbb-expansion-panel-content',
      )!;
      const lazyPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy',
      )! as SbbExpansionPanelElement;

      lazyPanelElement.expanded = true;
      lazyPanelElement.dispatchEvent(new Event('open'));
      fixture.detectChanges();
      expect(lazyPanelContent.textContent?.trim()).toEqual('Lazy content');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contentPortal = (lazyPanelDebug.componentInstance as any).contentPortal;

      lazyPanelElement.expanded = false;
      lazyPanelElement.dispatchEvent(new Event('close'));
      fixture.detectChanges();

      lazyPanelElement.expanded = true;
      lazyPanelElement.dispatchEvent(new Event('open'));
      fixture.detectChanges();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((lazyPanelDebug.componentInstance as any).contentPortal).toBe(contentPortal);
    });

    it('should update template changed of lazy content', async () => {
      const lazyPanelContent = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy sbb-expansion-panel-content',
      )!;
      const lazyPanelElement = (fixture.nativeElement as HTMLElement).querySelector(
        '#lazy',
      )! as SbbExpansionPanelElement;

      lazyPanelElement.expanded = true;
      lazyPanelElement.dispatchEvent(new Event('open'));
      fixture.detectChanges();
      expect(lazyPanelContent.textContent?.trim()).toEqual('Lazy content');

      fixture.componentInstance.content.set('Replaced Lazy');
      fixture.detectChanges();

      expect(lazyPanelContent.textContent?.trim()).toEqual('Replaced Lazy content');
    });
  });

  describe(`without sbb-expansion-panel`, () => {
    let fixture: ComponentFixture<FallbackTestComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(FallbackTestComponent);
      fixture.detectChanges();
    });

    it('should load content immediately when not inside an expansion panel', async () => {
      const panelContent = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-expansion-panel-content',
      )!;
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      // Content should be loaded immediately without needing to open the panel
      expect(panelContent.textContent?.trim()).toEqual('Fallback content');
    });

    it('should update content when signal changes', async () => {
      const panelContent = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-expansion-panel-content',
      )!;
      fixture.detectChanges();
      await fixture.whenRenderingDone();
      expect(panelContent.textContent?.trim()).toEqual('Fallback content');

      fixture.componentInstance.content.set('Updated');
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(panelContent.textContent?.trim()).toEqual('Updated content');
    });

    it('should handle null content in fallback mode', async () => {
      const panelContent = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-expansion-panel-content',
      )!;
      fixture.detectChanges();
      await fixture.whenRenderingDone();
      expect(panelContent.textContent?.trim()).toEqual('Fallback content');

      fixture.componentInstance.showContent.set(false);
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(panelContent.textContent?.trim()).toEqual('');
    });
  });
});

@Component({
  template: `
    <sbb-expansion-panel id="eager" [expanded]="true">
      <sbb-expansion-panel-header>Eager loading</sbb-expansion-panel-header>
      <sbb-expansion-panel-content>Eager content</sbb-expansion-panel-content>
    </sbb-expansion-panel>
    <sbb-expansion-panel id="lazy">
      <sbb-expansion-panel-header>Lazy loading</sbb-expansion-panel-header>
      <sbb-expansion-panel-content>
        @if (showContent()) {
          @if (replaceLazyContent()) {
            <ng-template sbbExpansionPanelContent>Replaced Lazy</ng-template>
          } @else {
            <ng-template sbbExpansionPanelContent>{{ content() }} content</ng-template>
          }
        }
      </sbb-expansion-panel-content>
    </sbb-expansion-panel>
  `,
  imports: [SbbExpansionPanelModule],
})
class TestComponent {
  replaceLazyContent = signal(false);
  showContent = signal(true);
  content = signal('Lazy');
}

@Component({
  template: `
    <sbb-expansion-panel-content>
      @if (showContent()) {
        <ng-template sbbExpansionPanelContent>{{ content() }} content</ng-template>
      }
    </sbb-expansion-panel-content>
  `,
  imports: [SbbExpansionPanelModule],
})
class FallbackTestComponent {
  showContent = signal(true);
  content = signal('Fallback');
}
