import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTeaserProductStaticDirective } from './teaser-product-static.js';

describe('SbbTeaserProductStaticDirective', () => {
  let component: SbbTeaserProductStaticDirective;
  let fixture: ComponentFixture<SbbTeaserProductStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTeaserProductStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
