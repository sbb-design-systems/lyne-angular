import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic container
 */
@Component({
  selector: 'sbb-container-basic-example',
  templateUrl: 'container-basic-example.html',
  imports: [SbbContainerModule, SbbTitleModule, SbbSecondaryButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerBasicExample {}
