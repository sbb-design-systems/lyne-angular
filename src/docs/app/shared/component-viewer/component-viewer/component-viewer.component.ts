import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';

@Component({
  selector: 'sbb-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  imports: [SbbTabsModule, RouterLink, RouterOutlet, RouterLinkActive],
})
export class ComponentViewerComponent {
  sections: string[] = ['Overview', 'API', 'Examples'];
}
