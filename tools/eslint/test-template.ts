import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { __className__ } from '__angularPath__';
import type { __className__Element } from '__elementsPath__';

describe('__name__', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: __className__Element;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('__name__');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector('__name__')!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<__name__></__name__>`,
  imports: [__className__],
})
class TestComponent {}
