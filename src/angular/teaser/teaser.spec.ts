import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTeaserDirective } from './teaser.js';

describe('SbbTeaserDirective', () => {
  let component: SbbTeaserDirective;
  let fixture: ComponentFixture<SbbTeaserDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTeaserDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
