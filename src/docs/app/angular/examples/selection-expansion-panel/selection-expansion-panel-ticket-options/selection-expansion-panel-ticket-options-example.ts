import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbPopoverModule } from '@sbb-esta/lyne-angular/popover';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectionExpansionPanelModule } from '@sbb-esta/lyne-angular/selection-expansion-panel';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title ticket options use case
 * @order 3
 */
@Component({
  selector: 'sbb-selection-expansion-panel-ticket-options-example',
  templateUrl: 'selection-expansion-panel-ticket-options-example.html',
  styleUrl: 'selection-expansion-panel-ticket-options-example.scss',
  imports: [
    SbbButtonModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbCheckboxPanelModule,
    SbbDividerModule,
    SbbIconModule,
    SbbLinkModule,
    SbbPopoverModule,
    SbbRadioButtonModule,
    SbbSelectionExpansionPanelModule,
    SbbTitleModule,
  ],
})
export class SelectionExpansionPanelTicketOptionsExample {}
