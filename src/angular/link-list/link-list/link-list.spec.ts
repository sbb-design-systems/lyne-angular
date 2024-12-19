import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLinkListDirective } from './link-list.js';

describe('SbbLinkListDirective', () => {
  let component: SbbLinkListDirective;
  let fixture: ComponentFixture<SbbLinkListDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLinkListDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
