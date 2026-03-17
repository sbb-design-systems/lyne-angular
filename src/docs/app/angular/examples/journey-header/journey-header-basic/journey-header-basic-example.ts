import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbJourneyHeaderModule } from '@sbb-esta/lyne-angular/journey-header';

/**
 * @title Basic journey-header
 */
@Component({
  selector: 'sbb-journey-header-basic-example',
  templateUrl: 'journey-header-basic-example.html',
  imports: [SbbJourneyHeaderModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyHeaderBasicExample {}
