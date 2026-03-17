import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';
import { SbbPopoverModule } from '@sbb-esta/lyne-angular/popover';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic popover
 */
@Component({
  selector: 'sbb-popover-basic-example',
  templateUrl: 'popover-basic-example.html',
  imports: [SbbPopoverModule, SbbMiniButton, SbbTitleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverBasicExample {}
