import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbExpansionPanelContentElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-content.js';

import { SbbExpansionPanelContent } from './expansion-panel-content';

describe('sbb-expansion-panel-content', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbExpansionPanelContentElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-expansion-panel-content');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-expansion-panel-content',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-expansion-panel-content></sbb-expansion-panel-content>`,
  imports: [SbbExpansionPanelContent],
})
class TestComponent {}
