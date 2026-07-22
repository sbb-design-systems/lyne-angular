import { Component, inject } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbToastModule, SbbToastService } from '@sbb-esta/lyne-angular/toast';

/**
 * @title toast opened via service
 * @order 2
 */
@Component({
  selector: 'sbb-toast-service-example',
  templateUrl: 'toast-service-example.html',
  imports: [SbbToastModule, SbbButtonModule],
})
export class ToastServiceExample {
  #toastService = inject(SbbToastService);

  openToast(): void {
    this.#toastService.open('Toast content');
  }
}
