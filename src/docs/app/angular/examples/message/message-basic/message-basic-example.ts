import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbMessageModule } from '@sbb-esta/lyne-angular/message';

/**
 * @title Basic message
 */
@Component({
  selector: 'sbb-message-basic-example',
  templateUrl: 'message-basic-example.html',
  imports: [SbbMessageModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBasicExample {}
