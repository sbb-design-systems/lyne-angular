import { NgModule } from '@angular/core';

import { SbbFileSelector } from './file-selector/file-selector';
import { SbbFileSelectorDropzone } from './file-selector-dropzone/file-selector-dropzone';

const SBB_FILE_SELECTOR_EXPORTED_DECLARATIONS = [SbbFileSelector, SbbFileSelectorDropzone];

@NgModule({
  imports: SBB_FILE_SELECTOR_EXPORTED_DECLARATIONS,
  exports: SBB_FILE_SELECTOR_EXPORTED_DECLARATIONS,
})
export class SbbFileSelectorModule {}
