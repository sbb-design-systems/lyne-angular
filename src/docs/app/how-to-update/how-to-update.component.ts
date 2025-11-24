import { Component } from '@angular/core';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-how-to-update',
  templateUrl: './how-to-update.component.html',
  styleUrls: ['./how-to-update.component.scss'],
  imports: [SbbContainer, SbbTitle],
})
export class HowToUpdateComponent {}
