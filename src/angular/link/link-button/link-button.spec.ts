import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLinkButtonDirective } from './link-button.js';

describe('SbbLinkButtonDirective', () => {
  let component: SbbLinkButtonDirective;
  let fixture: ComponentFixture<SbbLinkButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLinkButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
