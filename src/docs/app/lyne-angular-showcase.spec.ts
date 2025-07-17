import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LyneAngularShowcaseComponent } from './lyne-angular-showcase';

@Component({
  selector: 'sbb-test',
  template: `Test template STUB`,
})
export class TestComponentStub {}

describe('sbb-lyne-angular-showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LyneAngularShowcaseComponent, TestComponentStub],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LyneAngularShowcaseComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LyneAngularShowcaseComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
