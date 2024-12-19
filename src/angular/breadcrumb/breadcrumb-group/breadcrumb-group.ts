/* eslint-disable @angular-eslint/directive-selector */
import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/breadcrumb/breadcrumb-group.js';

@Directive({
  selector: 'sbb-breadcrumb-group',
  standalone: true,
})
export class SbbBreadcrumbGroupDirective {}
