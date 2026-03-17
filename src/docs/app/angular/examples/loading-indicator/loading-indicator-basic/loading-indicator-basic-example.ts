import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';

/**
 * @title Basic loading-indicator
 */
@Component({
  selector: 'sbb-loading-indicator-basic-example',
  templateUrl: 'loading-indicator-basic-example.html',
  imports: [SbbLoadingIndicatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorBasicExample {}
