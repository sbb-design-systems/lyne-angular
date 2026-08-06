import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbMapContainerModule } from '@sbb-esta/lyne-angular/map-container';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic map-container
 */
@Component({
  selector: 'sbb-map-container-basic-example',
  templateUrl: 'map-container-basic-example.html',
  styleUrl: 'map-container-basic-example.scss',
  imports: [
    SbbCardModule,
    SbbFormFieldModule,
    SbbHeaderModule,
    SbbIconModule,
    SbbLogoModule,
    SbbMapContainerModule,
    SbbTitleModule,
  ],
  host: { class: 'sbb-example-fullscreen-only' },
})
export class MapContainerBasicExample {}
