import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbJourneySummaryModule } from '@sbb-esta/lyne-angular-experimental/journey-summary';

/**
 * @title Basic journey-summary
 */
@Component({
  selector: 'sbb-journey-summary-basic-example',
  templateUrl: 'journey-summary-basic-example.html',
  imports: [SbbJourneySummaryModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneySummaryBasicExample {}
