import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title Basic tag
 */
@Component({
  selector: 'sbb-tag-basic-example',
  templateUrl: 'tag-basic-example.html',
  imports: [SbbTagModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagBasicExample {}
