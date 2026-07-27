import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionExpansionPanelModule } from '@sbb-esta/lyne-angular/selection-expansion-panel';

/**
 * @title selection-expansion-panel in a group
 * @order 2
 */
@Component({
  selector: 'sbb-selection-expansion-panel-group-example',
  templateUrl: 'selection-expansion-panel-group-example.html',
  styleUrl: 'selection-expansion-panel-group-example.scss',
  imports: [
    SbbCardModule,
    SbbIconModule,
    SbbLinkModule,
    SbbRadioButtonPanelModule,
    SbbSelectionExpansionPanelModule,
  ],
})
export class SelectionExpansionPanelGroupExample {}
