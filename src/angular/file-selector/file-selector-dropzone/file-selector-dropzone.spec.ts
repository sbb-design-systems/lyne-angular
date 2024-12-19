import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFileSelectorDropzoneDirective } from './file-selector-dropzone.js';

describe('SbbFileSelectorDropzoneDirective', () => {
  let component: SbbFileSelectorDropzoneDirective;
  let fixture: ComponentFixture<SbbFileSelectorDropzoneDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFileSelectorDropzoneDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
