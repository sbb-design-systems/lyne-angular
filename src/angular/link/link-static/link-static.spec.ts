import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLinkStaticDirective } from './link-static.js';

describe('SbbLinkStaticDirective', () => {
  let component: SbbLinkStaticDirective;
  let fixture: ComponentFixture<SbbLinkStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLinkStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
