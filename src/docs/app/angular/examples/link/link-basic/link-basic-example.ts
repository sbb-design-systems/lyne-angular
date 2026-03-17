import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';

/**
 * @title Basic link
 */
@Component({
  selector: 'sbb-link-basic-example',
  templateUrl: 'link-basic-example.html',
  imports: [SbbLink, SbbBlockLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBasicExample {}
