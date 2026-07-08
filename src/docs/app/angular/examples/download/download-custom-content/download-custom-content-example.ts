import { Component } from '@angular/core';
import { SbbDownloadModule } from '@sbb-esta/lyne-angular/download';

/**
 * @title download with custom content
 * @order 2
 */
@Component({
  selector: 'sbb-download-custom-content-example',
  templateUrl: 'download-custom-content-example.html',
  imports: [SbbDownloadModule],
})
export class DownloadCustomContentExample {}
