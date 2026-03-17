import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbToggleCheckModule } from '@sbb-esta/lyne-angular/toggle-check';

/**
 * @title Basic toggle-check
 */
@Component({
  selector: 'sbb-toggle-check-basic-example',
  templateUrl: 'toggle-check-basic-example.html',
  imports: [SbbToggleCheckModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleCheckBasicExample {}
