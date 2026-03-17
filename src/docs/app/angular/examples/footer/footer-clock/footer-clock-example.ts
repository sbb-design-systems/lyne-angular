import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButtonLink } from '@sbb-esta/lyne-angular/button/button-link';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbFooterModule } from '@sbb-esta/lyne-angular/footer';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';

/**
 * @title Basic footer
 */
@Component({
  selector: 'sbb-footer-clock-example',
  templateUrl: 'footer-clock-example.html',
  imports: [SbbFooterModule, SbbLinkListModule, SbbBlockLink, SbbButtonLink, SbbDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterClockExample {}
