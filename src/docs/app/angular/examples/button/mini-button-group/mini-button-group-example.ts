import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';

/**
 * @title Basic sbb-mini-button-group
 * @order 50
 */
@Component({
  selector: 'sbb-button-group-example',
  templateUrl: 'mini-button-group-example.html',
  imports: [SbbButtonModule, SbbDividerModule],
})
export class MiniButtonGroupExample {}
