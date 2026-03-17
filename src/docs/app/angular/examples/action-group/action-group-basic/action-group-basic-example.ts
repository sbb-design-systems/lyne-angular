import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';

/**
 * @title Basic action-group
 */
@Component({
  selector: 'sbb-action-group-basic-example',
  templateUrl: 'action-group-basic-example.html',
  imports: [SbbActionGroupModule, SbbSecondaryButton, SbbButton, SbbBlockLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionGroupBasicExample {}
