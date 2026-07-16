import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbSkiplinkListModule } from '@sbb-esta/lyne-angular/skiplink-list';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic skiplink-list
 * @order 1
 */
@Component({
  selector: 'sbb-skiplink-list-basic-example',
  templateUrl: 'skiplink-list-basic-example.html',
  imports: [RouterLink, SbbSkiplinkListModule, SbbLinkModule, SbbTitleModule],
})
export class SkiplinkListBasicExample {}
