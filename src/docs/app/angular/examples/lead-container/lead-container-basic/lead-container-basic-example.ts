import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLeadContainerModule } from '@sbb-esta/lyne-angular/lead-container';

/**
 * @title Basic lead-container
 */
@Component({
  selector: 'sbb-lead-container-basic-example',
  templateUrl: 'lead-container-basic-example.html',
  imports: [SbbLeadContainerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadContainerBasicExample {}
