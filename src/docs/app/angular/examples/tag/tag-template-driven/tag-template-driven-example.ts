import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title Tag in a template-driven form
 * @order 12
 */
@Component({
  selector: 'sbb-tag-template-driven-example',
  templateUrl: 'tag-template-driven-example.html',
  imports: [FormsModule, SbbCardModule, SbbTagModule, JsonPipe],
})
export class TagTemplateDrivenExample {
  protected form = { computers: false, phones: false };
}
