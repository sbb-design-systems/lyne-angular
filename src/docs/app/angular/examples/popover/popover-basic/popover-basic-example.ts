import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbPopoverModule } from '@sbb-esta/lyne-angular/popover';

/**
 * @title Basic popover
 */
@Component({
  selector: 'sbb-popover-basic-example',
  templateUrl: 'popover-basic-example.html',
  imports: [SbbPopoverModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverBasicExample {}
