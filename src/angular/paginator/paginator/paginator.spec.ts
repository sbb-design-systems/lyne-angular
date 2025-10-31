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

  it('should handle event emission when length changes', async () => {
    const pageEventSpy = spyOn(component, 'page');
    const privatePageEventSpy = spyOn(component, 'privatePage');

    component.paginator().length = 50;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(pageEventSpy).not.toHaveBeenCalled();
    expect(privatePageEventSpy).not.toHaveBeenCalled();

    component.paginator().pageIndex = 3;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(pageEventSpy).not.toHaveBeenCalled();
    expect(privatePageEventSpy).toHaveBeenCalled();

    component.paginator().length = 10;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(pageEventSpy).not.toHaveBeenCalled();
    expect(privatePageEventSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle event emission when pageSize changes', async () => {
    const pageEventSpy = spyOn(component, 'page');
    const privatePageEventSpy = spyOn(component, 'privatePage');

    component.paginator().pageSize = 1;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(pageEventSpy).not.toHaveBeenCalled();
    expect(privatePageEventSpy).toHaveBeenCalled();
  });

  it('should handle event emission when pageIndex changes', async () => {
    const pageEventSpy = spyOn(component, 'page');
    const privatePageEventSpy = spyOn(component, 'privatePage');

    component.paginator().pageIndex = 1;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(pageEventSpy).not.toHaveBeenCalled();
    expect(privatePageEventSpy).toHaveBeenCalled();

    component.paginator().pageSize = 1;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(pageEventSpy).not.toHaveBeenCalled();
    expect(privatePageEventSpy).toHaveBeenCalled();
  });
});

@Component({
  template: `<sbb-paginator
    (page)="page($event)"
    (ɵpage)="privatePage($event)"
    length="100"
    page-size="10"
  ></sbb-paginator>`,
  imports: [SbbPaginator],
})
class TestComponent {
  paginator = viewChild.required(SbbPaginator);

  page() {
    // no-op
  }

  privatePage() {
    // no-op
  }
}
