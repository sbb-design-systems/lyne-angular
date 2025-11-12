import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';

@Component({
  selector: 'sbb-button-basic-example',
  templateUrl: 'mini-button-basic-example.html',
  styleUrls: ['mini-button-basic-example.css'],
  imports: [SbbMiniButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniButtonBasicExample {}
