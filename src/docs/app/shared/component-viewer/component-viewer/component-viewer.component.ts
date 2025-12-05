import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbLinkButton } from '@sbb-esta/lyne-angular/link/link-button';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { ShowcaseMetaEntry } from '../../meta';
import { findPackageEntry } from '../../meta';
import { moduleParams } from '../../module-params';

@Component({
  selector: 'sbb-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  imports: [SbbLinkButton, RouterLink, RouterOutlet, RouterLinkActive],
})
export class ComponentViewerComponent implements OnInit {
  showcaseMetaEntry!: Observable<ShowcaseMetaEntry>;
  sections: string[] = ['Overview', 'API', 'Examples'];

  private _route = inject(ActivatedRoute);

  ngOnInit() {
    this.showcaseMetaEntry = moduleParams(this._route).pipe(
      map((params) => findPackageEntry(params.packageName, params.id)),
    );
  }
}
