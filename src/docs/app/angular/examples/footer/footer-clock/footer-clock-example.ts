import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbClockModule } from '@sbb-esta/lyne-angular/clock';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbFooterModule } from '@sbb-esta/lyne-angular/footer';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic footer
 */
@Component({
  selector: 'sbb-footer-clock-example',
  templateUrl: 'footer-clock-example.html',
  imports: [
    SbbFooterModule,
    SbbLinkListModule,
    SbbLinkModule,
    SbbButtonModule,
    SbbDividerModule,
    SbbClockModule,
    SbbTitleModule,
  ],
})
export class FooterClockExample {}
