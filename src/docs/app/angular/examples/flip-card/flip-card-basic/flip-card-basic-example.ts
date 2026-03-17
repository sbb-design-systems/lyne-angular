import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFlipCardModule } from '@sbb-esta/lyne-angular/flip-card';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic flip-card
 */
@Component({
  selector: 'sbb-flip-card-basic-example',
  templateUrl: 'flip-card-basic-example.html',
  imports: [SbbFlipCardModule, SbbTitleModule, SbbImageModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCardBasicExample {}
