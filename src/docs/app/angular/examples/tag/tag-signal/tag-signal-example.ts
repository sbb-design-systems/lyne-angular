import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title Tag with signal forms
 * @order 10
 */
@Component({
  selector: 'sbb-tag-signal-example',
  templateUrl: 'tag-signal-example.html',
  imports: [SbbTagModule, SbbCardModule, FormField, JsonPipe],
})
export class TagSignalExample {
  protected form = form(signal({ computers: false, phones: false }));
}
