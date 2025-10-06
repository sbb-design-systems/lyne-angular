import { Component } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
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

  fit('should load tabs eagerly and lazily', async () => {
    const eagerTabElement = (fixture.nativeElement as HTMLElement).querySelector('#eager')!;
    const lazyTabElement = (fixture.nativeElement as HTMLElement).querySelector('#lazy')!;
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(eagerTabElement.textContent).toEqual('Eager content');
    expect(lazyTabElement.textContent).toEqual('');
    const lazyTablabelElement = (fixture.nativeElement as HTMLElement).querySelector(
      '#lazy-label',
    )! as SbbTabLabelElement;
    lazyTablabelElement.click();
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    expect(lazyTabElement.textContent).toEqual('Lazy');
  });
});

@Component({
  template: `
    <sbb-tab-group>
      <sbb-tab-label active>Eager loading</sbb-tab-label>
      <sbb-tab id="eager">Eager content</sbb-tab>
      <sbb-tab-label id="lazy-label">Lazy loading</sbb-tab-label>
      <sbb-tab id="lazy">
        <ng-template sbbTabContent>Lazy</ng-template>
      </sbb-tab>
    </sbb-tab-group>
  `,
  imports: [SbbTabsModule],
})
class TestComponent {}
