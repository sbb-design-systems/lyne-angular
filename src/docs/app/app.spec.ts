import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { App } from './app';

@Component({
  selector: 'sbb-test',
  template: `Test template STUB`,
})
export class TestComponentStub {}

describe('sbb-app', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, TestComponentStub],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
