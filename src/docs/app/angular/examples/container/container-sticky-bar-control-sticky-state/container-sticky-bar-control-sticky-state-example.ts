import { Component, viewChild } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbContainerModule, SbbStickyBar } from '@sbb-esta/lyne-angular/container';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Container with sticky-bar and controls to stick/unstick
 * @order 4
 */
@Component({
  selector: 'sbb-container-sticky-bar-control-sticky-state-example',
  templateUrl: 'container-sticky-bar-control-sticky-state-example.html',
  styleUrl: 'container-sticky-bar-control-sticky-state-example.scss',
  host: { class: 'sbb-example-fullscreen-only' },
  imports: [
    SbbTitleModule,
    SbbButtonModule,
    SbbContainerModule,
    SbbActionGroupModule,
    SbbLinkModule,
  ],
})
export class ContainerStickyBarControlStickyStateExample {
  protected stickyBar = viewChild.required(SbbStickyBar);
}
