import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { map } from 'rxjs/operators';

import { ExampleOutletComponent } from '../shared/component-viewer/example-outlet/example-outlet.component';
import { ExampleData } from '../shared/example-data';

@Component({
  selector: 'sbb-fullscreen-example-viewer',
  templateUrl: './fullscreen-example-viewer.component.html',
  styleUrls: ['./fullscreen-example-viewer.component.scss'],
  imports: [ExampleOutletComponent, RouterLink, SbbNotificationModule, SbbLinkModule],
})
export class FullscreenExampleViewerComponent {
  protected readonly exampleData = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => ExampleData.findExample(params['package'], params['module'], params['id'])),
    ),
  );
  protected readonly showWarning = signal(true);

  protected removeWarning() {
    this.showWarning.set(false);
  }
}
