import { Component } from '@angular/core';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-introduction',
  templateUrl: './introduction.component.html',
  imports: [SbbTitleModule, SbbContainerModule, SbbLinkModule],
})
export class IntroductionComponent {}
