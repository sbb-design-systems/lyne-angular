import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';

/**
 * @title Basic action-group
 */
@Component({
  selector: 'sbb-action-group-basic-example',
  templateUrl: 'action-group-basic-example.html',
  imports: [SbbActionGroupModule, SbbButtonModule, SbbLinkModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionGroupBasicExample {}
