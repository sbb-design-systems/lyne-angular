import { Component } from '@angular/core';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  imports: [SbbTitle, SbbContainer],
})
export class IntroductionComponent {}
