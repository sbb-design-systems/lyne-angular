import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';

/**
 * @title Basic button
 */
@Component({
  selector: 'sbb-button-basic-example',
  templateUrl: 'button-basic-example.html',
  imports: [SbbButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBasicExample {}
