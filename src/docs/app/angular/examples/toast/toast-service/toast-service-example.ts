import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbToastModule, SbbToastService } from '@sbb-esta/lyne-angular/toast';

@Component({
  selector: 'sbb-toast-service-content-example',
  template: `{{ toastData.name }} created this <i>customized</i> component.`,
  imports: [SbbButtonModule],
})
export class ToastServiceContentExample {
  protected toastData = inject<{ name: string }>(SBB_OVERLAY_DATA);
}

/**
 * @title toast opened via service
 * @order 2
 */
@Component({
  selector: 'sbb-toast-service-example',
  templateUrl: 'toast-service-example.html',
  imports: [SbbActionGroupModule, SbbToastModule, SbbButtonModule, SbbLinkModule],
})
export class ToastServiceExample {
  protected link = viewChild.required('toastTemplate', { read: TemplateRef });
  #toastService = inject(SbbToastService);

  openToast(): void {
    this.#toastService.open('I am a simple toast message.');
  }

  openToastTemplate(): void {
    this.#toastService.open(this.link());
  }

  openToastComponent(): void {
    this.#toastService.open<ToastServiceContentExample>(ToastServiceContentExample, {
      data: { name: 'Yoshi' },
      setupContainer: (t) => {
        t.readOnly = true;
        t.iconName = 'dinosaur-small';
        t.timeout = 6000;
      },
    });
  }
}
