import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbMessageModule } from '@sbb-esta/lyne-angular/message';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <component name> with configurable properties
 */
@Component({
  selector: 'sbb-message-no-image-example',
  templateUrl: 'message-no-image-example.html',
  imports: [SbbMessageModule, SbbButtonModule, SbbTitleModule],
})
export class MessageNoImageExample {}
