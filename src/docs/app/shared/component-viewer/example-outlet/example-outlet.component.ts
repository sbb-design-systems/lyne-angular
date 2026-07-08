import { Component, inject, input, ViewContainerRef } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import type { ExampleData } from '../../example-data';
import { loadExample } from '../../example-module';

@Component({
  selector: 'sbb-example-outlet',
  template: '',
})
export class ExampleOutletComponent {
  readonly #viewContainerRef = inject(ViewContainerRef);
  exampleData = input.required<ExampleData>();

  constructor() {
    toObservable(this.exampleData)
      .pipe(filter((e) => !!e))
      .subscribe((e) => {
        loadExample(e.id).then((example) => {
          if (example) {
            this.#viewContainerRef.createComponent(example[e.name]);
          }
        });
      });
  }
}
