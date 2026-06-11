import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTeaser } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
  imports: [SbbTitleModule, SbbLinkModule, SbbTeaser, RouterLink, SbbActionGroup],
})
export class IntroductionComponent {}
