import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbLinkButton } from '@sbb-esta/lyne-angular/link/link-button';

@Component({
  selector: 'sbb-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  imports: [SbbLinkButton, RouterLink, RouterOutlet, RouterLinkActive],
})
export class ComponentViewerComponent {
  sections: string[] = ['Overview', 'API', 'Examples'];
}
