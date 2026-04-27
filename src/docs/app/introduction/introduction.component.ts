import { Component } from '@angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
  imports: [SbbTitleModule, SbbLinkModule],
})
export class IntroductionComponent {}
