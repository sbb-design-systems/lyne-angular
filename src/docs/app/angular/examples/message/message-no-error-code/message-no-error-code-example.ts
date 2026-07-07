import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbMessageModule } from '@sbb-esta/lyne-angular/message';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <component name> with configurable properties
 */
@Component({
  selector: 'sbb-message-no-error-code-example',
  templateUrl: 'message-no-error-code-example.html',
  imports: [SbbMessageModule, SbbButtonModule, SbbImageModule, SbbTitleModule],
})
export class MessageNoErrorCodeExample {}
