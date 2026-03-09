import type { Signal } from '@angular/core';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { map } from 'rxjs/operators';

import type { ShowcaseMetaPackage } from '../meta';

@Component({
  selector: 'sbb-package-viewer',
  templateUrl: './package-viewer.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SbbAccordionModule,
    SbbBlockLink,
    SbbSidebarModule,
  ],
})
export class PackageViewerComponent {
  #activatedRoute = inject(ActivatedRoute);
  package: Signal<ShowcaseMetaPackage> = toSignal(
    this.#activatedRoute.data.pipe(map((data) => data['packageData'] as ShowcaseMetaPackage)),
    { initialValue: {} as ShowcaseMetaPackage },
  );
}
