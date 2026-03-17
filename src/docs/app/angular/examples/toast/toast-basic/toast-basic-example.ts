import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbToastModule, SbbToastService } from '@sbb-esta/lyne-angular/toast';

/**
 * @title Basic toast
 */
@Component({
  selector: 'sbb-toast-basic-example',
  templateUrl: 'toast-basic-example.html',
  imports: [SbbToastModule, SbbButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicExample {
  #toastService = inject(SbbToastService);

  openToast(): void {
    this.#toastService.open('Toast content');
  }
}
