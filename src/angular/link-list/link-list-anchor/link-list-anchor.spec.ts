import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLinkListAnchorDirective } from './link-list-anchor.js';

describe('SbbLinkListAnchorDirective', () => {
  let component: SbbLinkListAnchorDirective;
  let fixture: ComponentFixture<SbbLinkListAnchorDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLinkListAnchorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
