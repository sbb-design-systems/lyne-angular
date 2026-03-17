import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbSkiplinkListModule } from '@sbb-esta/lyne-angular/skiplink-list';

/**
 * @title Basic skiplink-list
 */
@Component({
  selector: 'sbb-skiplink-list-basic-example',
  templateUrl: 'skiplink-list-basic-example.html',
  imports: [SbbSkiplinkListModule, SbbBlockLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkiplinkListBasicExample {}
