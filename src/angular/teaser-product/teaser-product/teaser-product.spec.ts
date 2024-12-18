import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTeaserProductDirective } from './teaser-product.js';

describe('SbbTeaserProductDirective', () => {
  let component: SbbTeaserProductDirective;
  let fixture: ComponentFixture<SbbTeaserProductDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTeaserProductDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
