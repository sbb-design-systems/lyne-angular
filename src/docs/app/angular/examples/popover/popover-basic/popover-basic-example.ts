import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbPopoverModule } from '@sbb-esta/lyne-angular/popover';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic popover
 */
@Component({
  selector: 'sbb-popover-basic-example',
  templateUrl: 'popover-basic-example.html',
  imports: [SbbPopoverModule, SbbButtonModule, SbbTitleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverBasicExample {}
