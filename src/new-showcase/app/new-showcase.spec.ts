import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NewShowcaseComponent } from './new-showcase';

@Component({
  selector: 'sbb-test',
  template: `Test template STUB`,
})
export class TestComponentStub {}

describe('sbb-new-showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewShowcaseComponent, TestComponentStub],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NewShowcaseComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NewShowcaseComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
