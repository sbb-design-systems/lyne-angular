import { Component } from '@angular/core';
import { SbbFooterModule } from '@sbb-esta/lyne-angular/footer';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';

/**
 * @title Basic footer
 */
@Component({
  selector: 'sbb-footer-basic-example',
  templateUrl: 'footer-basic-example.html',
  imports: [SbbFooterModule, SbbLinkListModule, SbbLinkModule],
})
export class FooterBasicExample {}
