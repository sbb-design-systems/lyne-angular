import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbMessageModule } from '@sbb-esta/lyne-angular/message';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic message
 */
@Component({
  selector: 'sbb-message-basic-example',
  templateUrl: 'message-basic-example.html',
  imports: [SbbMessageModule, SbbImageModule, SbbTitleModule, SbbButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBasicExample {}
