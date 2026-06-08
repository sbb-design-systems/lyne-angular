import { Component, inject } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbToastModule, SbbToastService } from '@sbb-esta/lyne-angular/toast';

/**
 * @title Basic toast
 */
@Component({
  selector: 'sbb-toast-basic-example',
  templateUrl: 'toast-basic-example.html',
  imports: [SbbToastModule, SbbButtonModule],
})
export class ToastBasicExample {
  #toastService = inject(SbbToastService);

  openToast(): void {
    this.#toastService.open('Toast content');
  }
}
