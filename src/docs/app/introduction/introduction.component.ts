import { Component } from '@angular/core';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-introduction',
  templateUrl: './introduction.component.html',
  imports: [SbbTitle, SbbContainer, SbbLink],
})
export class IntroductionComponent {}
