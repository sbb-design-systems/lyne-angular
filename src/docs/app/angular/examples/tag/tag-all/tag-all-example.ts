import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title tag-group with all selection
 * @order 3
 */
@Component({
  selector: 'sbb-tag-all-example',
  templateUrl: 'tag-all-example.html',
  imports: [SbbTagModule, TitleCasePipe, SbbCardModule, FormField],
})
export class TagAllExample {
  protected readonly devices = ['phones', 'computer', 'laptop'] as const;
  protected tagsForm = form(
    signal({
      all: false,
      phones: false,
      computer: false,
      laptop: false,
    }),
  );

  protected updateTags(): void {
    const checked = this.tagsForm.all().value();
    this.devices.forEach((d) => this.tagsForm[d]().value.set(checked));
  }

  protected updateTagAll(): void {
    const allChecked = this.devices.every((d) => this.tagsForm[d]().value());
    this.tagsForm.all().value.set(allChecked);
    if (allChecked) {
      this.updateTags();
    }
  }
}
