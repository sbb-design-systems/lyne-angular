import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSecondaryButtonStaticDirective } from './secondary-button-static.js';

describe('SbbSecondaryButtonStaticDirective', () => {
  let component: SbbSecondaryButtonStaticDirective;
  let fixture: ComponentFixture<SbbSecondaryButtonStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSecondaryButtonStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
