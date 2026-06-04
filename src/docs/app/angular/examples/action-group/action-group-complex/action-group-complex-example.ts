import { Component } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';

/**
 * @title Complex action-group
 */
@Component({
  selector: 'sbb-action-group-complex-example',
  templateUrl: 'action-group-complex-example.html',
  styleUrl: 'action-group-complex-example.scss',
  imports: [SbbActionGroupModule, SbbButtonModule],
})
export class ActionGroupComplexExample {}
