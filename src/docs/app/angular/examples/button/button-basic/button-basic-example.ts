import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAccentButton } from '@sbb-esta/lyne-angular/button/accent-button';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbTransparentButton } from '@sbb-esta/lyne-angular/button/transparent-button';

/**
 * @title Basic button
 */
@Component({
  selector: 'sbb-button-basic-example',
  templateUrl: 'button-basic-example.html',
  imports: [SbbButton, SbbSecondaryButton, SbbAccentButton, SbbTransparentButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBasicExample {}
