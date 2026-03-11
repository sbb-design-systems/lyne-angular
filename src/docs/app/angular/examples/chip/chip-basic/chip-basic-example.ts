import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';

/**
 * @title Basic chip
 */
@Component({
  selector: 'sbb-chip-basic-example',
  templateUrl: 'chip-basic-example.html',
  imports: [SbbChipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipBasicExample {}
