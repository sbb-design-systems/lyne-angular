import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListAnchorModule } from '@sbb-esta/lyne-angular/link-list-anchor';

/**
 * @title Basic link-list-anchor
 */
@Component({
  selector: 'sbb-link-list-anchor-basic-example',
  templateUrl: 'link-list-anchor-basic-example.html',
  imports: [SbbLinkListAnchorModule, SbbLinkModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkListAnchorBasicExample {}
