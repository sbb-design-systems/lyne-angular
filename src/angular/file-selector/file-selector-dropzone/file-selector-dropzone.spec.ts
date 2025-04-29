import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFileSelectorDropzone } from './file-selector-dropzone';

describe('sbb-file-selector-dropzone', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-file-selector-dropzone></sbb-file-selector-dropzone>`,
  imports: [SbbFileSelectorDropzone],
})
class TestComponent {}
