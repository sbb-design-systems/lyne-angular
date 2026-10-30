import { Component } from '@angular/core';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-header with usermenu button
 * @order 4
 */
@Component({
  selector: 'sbb-header-usermenu-example',
  templateUrl: 'header-usermenu-example.html',
  imports: [SbbHeaderModule, SbbLogoModule, SbbContainerModule, SbbTitleModule, SbbMenuModule],
  host: {
    class: 'sbb-example-fullscreen-only',
  },
})
export class HeaderUsermenuExample {
  protected displayName?: string;

  protected logout(): void {
    this.displayName = undefined;
  }

  protected login(): void {
    this.displayName = 'Arthur Morgan';
  }
}
