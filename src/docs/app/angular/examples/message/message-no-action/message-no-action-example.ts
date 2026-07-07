import { Component } from '@angular/core';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbMessageModule } from '@sbb-esta/lyne-angular/message';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <component name> with configurable properties
 */
@Component({
  selector: 'sbb-message-no-action-example',
  templateUrl: 'message-no-action-example.html',
  imports: [SbbMessageModule, SbbImageModule, SbbTitleModule],
})
export class MessageNoActionExample {}
