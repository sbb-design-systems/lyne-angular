import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButtonLink } from '@sbb-esta/lyne-angular/button/button-link';
import { SbbSecondaryButtonLink } from '@sbb-esta/lyne-angular/button/secondary-button-link';
import { SbbClock } from '@sbb-esta/lyne-angular/clock';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbFooterModule } from '@sbb-esta/lyne-angular/footer';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic footer
 */
@Component({
  selector: 'sbb-footer-clock-example',
  templateUrl: 'footer-clock-example.html',
  imports: [
    SbbFooterModule,
    SbbLinkListModule,
    SbbBlockLink,
    SbbButtonLink,
    SbbDividerModule,
    SbbClock,
    SbbTitle,
    SbbSecondaryButtonLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterClockExample {}
