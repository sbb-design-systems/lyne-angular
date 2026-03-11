import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFlipCardModule } from '@sbb-esta/lyne-angular/flip-card';

/**
 * @title Basic flip-card
 */
@Component({
  selector: 'sbb-flip-card-basic-example',
  templateUrl: 'flip-card-basic-example.html',
  imports: [SbbFlipCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCardBasicExample {}
