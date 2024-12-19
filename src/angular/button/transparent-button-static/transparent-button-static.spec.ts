import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTransparentButtonStaticDirective } from './transparent-button-static.js';

describe('SbbTransparentButtonStaticDirective', () => {
  let component: SbbTransparentButtonStaticDirective;
  let fixture: ComponentFixture<SbbTransparentButtonStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTransparentButtonStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
