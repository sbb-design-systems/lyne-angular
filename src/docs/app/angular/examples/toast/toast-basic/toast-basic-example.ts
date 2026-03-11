import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbToastModule } from '@sbb-esta/lyne-angular/toast';

/**
 * @title Basic toast
 */
@Component({
  selector: 'sbb-toast-basic-example',
  templateUrl: 'toast-basic-example.html',
  imports: [SbbToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicExample {}
