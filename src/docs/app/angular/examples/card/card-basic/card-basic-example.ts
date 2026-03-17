import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';

/**
 * @title Basic card
 */
@Component({
  selector: 'sbb-card-basic-example',
  templateUrl: 'card-basic-example.html',
  imports: [SbbCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasicExample {}
