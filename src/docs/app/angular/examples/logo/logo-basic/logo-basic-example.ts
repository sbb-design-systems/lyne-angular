import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';

/**
 * @title Basic logo
 */
@Component({
  selector: 'sbb-logo-basic-example',
  templateUrl: 'logo-basic-example.html',
  imports: [SbbLogoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoBasicExample {}
