import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { map } from 'rxjs';

@Component({
  selector: 'sbb-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  imports: [SbbTabsModule, RouterLink, RouterOutlet, RouterLinkActive, SbbTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentViewerComponent {
  protected sections: string[] = ['Overview', 'API', 'Examples'];

  #route = inject(ActivatedRoute);

  protected title = toSignal(
    this.#route.url.pipe(
      map((segments) =>
        (segments.at(-1)?.path ?? '')
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      ),
    ),
    { initialValue: '' },
  );
}
