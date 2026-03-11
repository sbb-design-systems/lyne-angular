import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';

/**
 * @title Basic action-group
 */
@Component({
  selector: 'sbb-action-group-basic-example',
  templateUrl: 'action-group-basic-example.html',
  imports: [SbbActionGroupModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionGroupBasicExample {}
