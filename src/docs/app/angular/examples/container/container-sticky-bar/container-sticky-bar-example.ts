import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import {
  SbbContainerModule,
  type SbbContainer,
  type SbbStickyBar,
} from '@sbb-esta/lyne-angular/container';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Container with sticky-bar
 * @order 3
 */
@Component({
  selector: 'sbb-container-sticky-bar-example',
  templateUrl: 'container-sticky-bar-example.html',
  styleUrl: 'container-sticky-bar-example.scss',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbSelectModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbButtonModule,
    SbbContainerModule,
    SbbActionGroupModule,
    SbbLinkModule,
  ],
})
export class ContainerStickyBarExample {
  protected containerControls = form(
    signal({
      color: 'white' as SbbContainer['color'],
      expanded: false,
      backgroundExpanded: false,
    }),
  );
  protected stickybarControls = form(
    signal({
      size: null as SbbStickyBar['size'],
      color: null as SbbStickyBar['color'],
    }),
  );
}
