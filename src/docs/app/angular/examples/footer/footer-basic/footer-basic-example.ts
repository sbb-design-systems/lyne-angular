import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFooterModule } from '@sbb-esta/lyne-angular/footer';

/**
 * @title Basic footer
 */
@Component({
  selector: 'sbb-footer-basic-example',
  templateUrl: 'footer-basic-example.html',
  imports: [SbbFooterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBasicExample {}
