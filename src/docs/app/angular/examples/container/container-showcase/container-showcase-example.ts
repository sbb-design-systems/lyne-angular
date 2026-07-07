import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbContainer, SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Container showcase
 * @order 1
 */
@Component({
  selector: 'sbb-container-showcase-example',
  templateUrl: 'container-showcase-example.html',
  styleUrl: 'container-showcase-example.scss',
  imports: [
    SbbContainerModule,
    SbbTitleModule,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbSelectModule,
    FormField,
  ],
})
export class ContainerShowcaseExample {
  protected controls = form(
    signal({
      color: 'white' as SbbContainer['color'],
      expanded: false,
      backgroundExpanded: false,
    }),
  );
}
