import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbScreenReaderOnlyModule } from '@sbb-esta/lyne-angular/screen-reader-only';

/**
 * @title Basic screen-reader-only
 */
@Component({
  selector: 'sbb-screen-reader-only-basic-example',
  templateUrl: 'screen-reader-only-basic-example.html',
  imports: [SbbScreenReaderOnlyModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenReaderOnlyBasicExample {}
