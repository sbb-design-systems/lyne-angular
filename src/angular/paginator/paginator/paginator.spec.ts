import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { SbbPaginator } from './paginator';

describe('sbb-paginator', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and emit initialized', async () => {
    expect(component).toBeDefined();

    // We wait to ensure the paginator is initialized event is triggered when subscribing later.
    await new Promise((resolve) => setTimeout(resolve, 10));
    let called = false;

    component
      .paginator()
      .initialized.pipe(take(1))
      .subscribe(() => {
        called = true;
      });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(called).toBeTrue();
  });

  it('should not emit page event during initialization', async () => {
    const pageEventSpy = spyOn(component, 'page');

    // We wait to wait a little bit to capture potential events.
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(pageEventSpy).not.toHaveBeenCalled();
  });

  it('should not emit page event when changing length', async () => {
    const pageEventSpy = spyOn(component, 'page');

    component.paginator().length = 100;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(pageEventSpy).not.toHaveBeenCalled();
  });

  it('should not emit page event when changing pageSize', async () => {
    const pageEventSpy = spyOn(component, 'page');

    component.paginator().pageSize = 1;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(pageEventSpy).not.toHaveBeenCalled();
  });

  it('should not emit page event when changing pageIndex', async () => {
    const pageEventSpy = spyOn(component, 'page');

    component.paginator().pageSize = 1;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(pageEventSpy).not.toHaveBeenCalled();
  });
});

@Component({
  template: `<sbb-paginator (page)="page($event)"></sbb-paginator>`,
  imports: [SbbPaginator],
})
class TestComponent {
  paginator = viewChild.required(SbbPaginator);

  page() {
    // no-op
  }
}
