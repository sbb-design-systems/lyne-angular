import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';

/**
 * @title Basic container
 */
@Component({
  selector: 'sbb-container-basic-example',
  templateUrl: 'container-basic-example.html',
  imports: [SbbContainerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerBasicExample {}
