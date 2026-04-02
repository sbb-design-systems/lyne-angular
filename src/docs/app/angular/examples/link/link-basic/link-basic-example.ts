import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';

/**
 * @title Basic link
 */
@Component({
  selector: 'sbb-link-basic-example',
  templateUrl: 'link-basic-example.html',
  imports: [SbbLinkModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBasicExample {}
