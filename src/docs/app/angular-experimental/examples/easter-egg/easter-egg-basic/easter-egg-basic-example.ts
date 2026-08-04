import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbEasterEggModule } from '@sbb-esta/lyne-angular-experimental/easter-egg';

/**
 * @title <component name> with configurable properties
 */
@Component({
  selector: 'sbb-easter-egg-basic-example',
  templateUrl: 'easter-egg-basic-example.html',
  imports: [SbbButtonModule, SbbEasterEggModule],
})
export class EasterEggBasicExample {}
