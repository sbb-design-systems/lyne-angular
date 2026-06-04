import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic container
 */
@Component({
  selector: 'sbb-container-basic-example',
  templateUrl: 'container-basic-example.html',
  imports: [SbbContainerModule, SbbTitleModule, SbbButtonModule],
})
export class ContainerBasicExample {}
