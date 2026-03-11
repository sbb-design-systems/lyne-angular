import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';

/**
 * @title Basic chip-label
 */
@Component({
  selector: 'sbb-chip-label-basic-example',
  templateUrl: 'chip-label-basic-example.html',
  imports: [SbbChipLabelModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipLabelBasicExample {}
