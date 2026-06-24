import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

import { PACKAGES } from '../shared/meta';

@Component({
  selector: 'sbb-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
  imports: [
    KeyValuePipe,
    RouterLink,
    SbbActionGroupModule,
    SbbButtonModule,
    SbbCardModule,
    SbbChipLabelModule,
    SbbLinkListModule,
    SbbLinkModule,
    SbbTeaserModule,
    SbbTitleModule,
  ],
})
export class IntroductionComponent {
  protected packages = PACKAGES;
}
