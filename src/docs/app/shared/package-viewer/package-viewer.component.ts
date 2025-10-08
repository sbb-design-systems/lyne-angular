import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbExpansionPanelModule } from '@sbb-esta/lyne-angular/expansion-panel';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { ShowcaseMetaPackage } from '../meta';

@Component({
  selector: 'sbb-package-viewer',
  templateUrl: './package-viewer.component.html',
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SbbExpansionPanelModule,
    SbbBlockLink,
    SbbSidebarModule,
  ],
})
export class PackageViewerComponent {
  package: Observable<ShowcaseMetaPackage>;
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.package = this.activatedRoute.data.pipe(
      map((data) => data['packageData'] as ShowcaseMetaPackage),
    );
  }
}
