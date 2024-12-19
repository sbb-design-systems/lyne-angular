import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTeaserHeroDirective } from './teaser-hero.js';

describe('SbbTeaserHeroDirective', () => {
  let component: SbbTeaserHeroDirective;
  let fixture: ComponentFixture<SbbTeaserHeroDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTeaserHeroDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
