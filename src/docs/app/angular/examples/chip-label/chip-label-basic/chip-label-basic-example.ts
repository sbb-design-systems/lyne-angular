import { Component } from '@angular/core';
import type { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';

/**
 * @title Basic chip-label
 */
@Component({
  selector: 'sbb-chip-label-basic-example',
  templateUrl: 'chip-label-basic-example.html',
  styleUrl: 'chip-label-basic-example.scss',
  imports: [SbbChipLabelModule],
})
export class ChipLabelBasicExample {
  protected readonly colors: SbbChipLabel['color'][] = ['charcoal', 'granite', 'milk', 'white'];
  protected readonly sizes: SbbChipLabel['size'][] = ['s', 'xs', 'xxs', 'xxs'];
}
