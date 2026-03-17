import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLoadingIndicatorCircleModule } from '@sbb-esta/lyne-angular/loading-indicator-circle';

/**
 * @title Basic loading-indicator-circle
 */
@Component({
  selector: 'sbb-loading-indicator-circle-basic-example',
  templateUrl: 'loading-indicator-circle-basic-example.html',
  imports: [SbbLoadingIndicatorCircleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorCircleBasicExample {}
