import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';

/**
 * @title Basic link-list
 */
@Component({
  selector: 'sbb-link-list-basic-example',
  templateUrl: 'link-list-basic-example.html',
  imports: [SbbLinkListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkListBasicExample {}
