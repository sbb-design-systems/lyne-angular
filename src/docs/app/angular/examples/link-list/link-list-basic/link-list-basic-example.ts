import { Component } from '@angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';

/**
 * @title Basic link-list
 */
@Component({
  selector: 'sbb-link-list-basic-example',
  templateUrl: 'link-list-basic-example.html',
  imports: [SbbLinkListModule, SbbLinkModule],
})
export class LinkListBasicExample {}
