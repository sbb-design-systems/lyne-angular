import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title tag in a reactive form
 * @order 11
 */
@Component({
  selector: 'sbb-tag-reactive-example',
  templateUrl: 'tag-reactive-example.html',
  imports: [ReactiveFormsModule, SbbCardModule, JsonPipe, SbbTagModule],
})
export class TagReactiveExample {
  protected form = new FormGroup({
    computers: new FormControl(false),
    phones: new FormControl(false),
  });
}
