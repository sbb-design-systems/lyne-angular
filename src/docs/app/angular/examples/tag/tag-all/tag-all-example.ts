import { TitleCasePipe } from '@angular/common';
import { Component, computed, viewChildren } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTag, SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title tag-group with all selection
 * @order 3
 */
@Component({
  selector: 'sbb-tag-all-example',
  templateUrl: 'tag-all-example.html',
  imports: [SbbTagModule, TitleCasePipe, SbbCardModule],
})
export class TagAllExample {
  protected tags = viewChildren(SbbTag);
  protected tagAll = computed<SbbTag>(() => this.tags().find((t) => t.value === 'all')!);
  protected filteredTags = computed<SbbTag[]>(() =>
    this.tags().filter((t) => !t.disabled && t.value !== 'all'),
  );

  protected updateTags() {
    this.filteredTags().forEach((t) => (t.checked = !this.tagAll().checked));
  }

  protected updateTagAll() {
    this.tagAll().checked = this.filteredTags().every((t) => t.checked);
    if (this.tagAll().checked) {
      this.updateTags();
    }
  }
}
