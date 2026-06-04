import { Location } from '@angular/common';
import type { Signal } from '@angular/core';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListAnchorModule } from '@sbb-esta/lyne-angular/link-list-anchor';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { map } from 'rxjs/operators';

import { ExampleData } from '../../example-data';
import { moduleParams } from '../../module-params';
import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';

@Component({
  selector: 'sbb-example-list-viewer',
  templateUrl: './example-list-viewer.component.html',
  imports: [ExampleViewerComponent, SbbTitleModule, SbbLinkListAnchorModule, SbbLinkModule],
})
export class ExampleListViewerComponent {
  readonly #route = inject(ActivatedRoute);

  protected currentPath = inject(Location).path();
  examples: Signal<ExampleData[]> = toSignal(
    moduleParams(this.#route).pipe(
      map((params) => {
        const examples = ExampleData.find(params.packageName, params.id, params.module);
        return examples.length === 0 ? [] : examples;
      }),
    ),
    { initialValue: [] },
  );
}
