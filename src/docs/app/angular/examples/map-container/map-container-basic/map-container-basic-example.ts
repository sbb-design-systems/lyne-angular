import { Component } from '@angular/core';
import { SbbMapContainerModule } from '@sbb-esta/lyne-angular/map-container';

/**
 * @title Basic map-container
 */
@Component({
  selector: 'sbb-map-container-basic-example',
  templateUrl: 'map-container-basic-example.html',
  imports: [SbbMapContainerModule],
  host: { class: 'sbb-example-fullscreen-only' },
})
export class MapContainerBasicExample {}
