import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Link card
 * @order 2
 */
@Component({
  selector: 'sbb-card-link-example',
  templateUrl: 'card-link-example.html',
  imports: [SbbCardModule, SbbTitleModule],
})
export class CardLinkExample {}
