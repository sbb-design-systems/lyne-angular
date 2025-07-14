import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({
  selector: 'sbb-test',
  template: `Test template STUB`,
})
export class TestComponentStub {}

describe('sbb-app', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TestComponentStub],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
