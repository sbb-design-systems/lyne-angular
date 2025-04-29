import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbExpansionPanelHeaderElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-header.js';

import { SbbExpansionPanelHeader } from './expansion-panel-header';

describe('sbb-expansion-panel-header', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbExpansionPanelHeaderElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-expansion-panel-header');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-expansion-panel-header',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-expansion-panel-header></sbb-expansion-panel-header>`,
  imports: [SbbExpansionPanelHeader],
})
class TestComponent {}
