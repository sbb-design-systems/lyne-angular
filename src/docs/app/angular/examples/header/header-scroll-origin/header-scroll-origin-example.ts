import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Header with different scroll origin
 * @order 3
 */
@Component({
  selector: 'sbb-header-scroll-origin-example',
  templateUrl: 'header-scroll-origin-example.html',
  styleUrl: 'header-scroll-origin-example.scss',
  imports: [SbbCardModule, SbbContainerModule, SbbHeaderModule, SbbLogoModule, SbbTitleModule],
  host: {
    class: 'fullscreen-example',
  },
})
export class HeaderScrollOriginExample {}
