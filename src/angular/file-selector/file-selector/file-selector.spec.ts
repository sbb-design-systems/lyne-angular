import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFileSelectorDirective } from './file-selector.js';

describe('SbbFileSelectorDirective', () => {
  let component: SbbFileSelectorDirective;
  let fixture: ComponentFixture<SbbFileSelectorDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFileSelectorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
