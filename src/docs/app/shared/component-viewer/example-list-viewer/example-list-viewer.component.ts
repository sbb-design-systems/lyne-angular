import type { Signal } from '@angular/core';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { ExampleData } from '../../example-data';
import { moduleParams } from '../../module-params';
import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';

@Component({
  selector: 'sbb-example-list-viewer',
  templateUrl: './example-list-viewer.component.html',
  imports: [ExampleViewerComponent],
})
export class ExampleListViewerComponent {
  #route = inject(ActivatedRoute);
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
