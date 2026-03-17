import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';

/**
 * @title Basic header
 */
@Component({
  selector: 'sbb-header-basic-example',
  templateUrl: 'header-basic-example.html',
  imports: [SbbHeaderModule, SbbLogoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBasicExample {}
