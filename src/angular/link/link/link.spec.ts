import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLinkDirective } from './link.js';

describe('SbbLinkDirective', () => {
  let component: SbbLinkDirective;
  let fixture: ComponentFixture<SbbLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
