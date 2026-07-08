import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbNavigationModule } from '@sbb-esta/lyne-angular/navigation';

/**
 * @title navigation with section
 */
@Component({
  selector: 'sbb-navigation-section-example',
  templateUrl: 'navigation-section-example.html',
  imports: [SbbButtonModule, SbbNavigationModule, NgTemplateOutlet],
})
export class NavigationSectionExample {}
