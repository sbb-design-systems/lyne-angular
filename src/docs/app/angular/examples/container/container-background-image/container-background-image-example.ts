import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Container with background image
 * @order 2
 */
@Component({
  selector: 'sbb-container-background-image-example',
  templateUrl: 'container-background-image-example.html',
  styleUrl: 'container-background-image-example.scss',
  host: { class: 'sbb-example-fullscreen' },
  imports: [SbbTitleModule, SbbButtonModule, SbbImageModule, SbbContainerModule],
})
export class ContainerBackgroundImageExample {}
