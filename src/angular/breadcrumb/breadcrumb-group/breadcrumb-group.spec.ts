import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbBreadcrumbGroupElement } from '@sbb-esta/lyne-elements/breadcrumb/breadcrumb-group.js';

import { SbbBreadcrumbGroup } from './breadcrumb-group';

describe('sbb-breadcrumb-group', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbBreadcrumbGroupElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-breadcrumb-group');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-breadcrumb-group',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-breadcrumb-group></sbb-breadcrumb-group>`,
  imports: [SbbBreadcrumbGroup],
})
class TestComponent {}
