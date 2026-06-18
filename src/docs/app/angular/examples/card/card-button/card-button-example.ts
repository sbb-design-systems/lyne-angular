import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Button card
 * @order 3
 */
@Component({
  selector: 'sbb-card-button-example',
  templateUrl: 'card-button-example.html',
  imports: [SbbCardModule, SbbTitleModule],
})
export class CardButtonExample {}
