import { NgModule } from '@angular/core';

import { SbbDownload } from './download/download';
import { SbbDownloadInfo } from './download-info/download-info';

const SBB_DOWNLOAD_EXPORTED_DECLARATIONS = [SbbDownload, SbbDownloadInfo];

@NgModule({
  imports: SBB_DOWNLOAD_EXPORTED_DECLARATIONS,
  exports: SBB_DOWNLOAD_EXPORTED_DECLARATIONS,
})
export class SbbDownloadModule {}
