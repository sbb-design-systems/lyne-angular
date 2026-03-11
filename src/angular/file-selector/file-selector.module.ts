import { NgModule } from '@angular/core';
import { SbbFileSelector } from '@sbb-esta/lyne-angular/file-selector/file-selector';
import { SbbFileSelectorDropzone } from '@sbb-esta/lyne-angular/file-selector/file-selector-dropzone';

const SBB_FILE_SELECTOR_EXPORTED_DECLARATIONS = [SbbFileSelector, SbbFileSelectorDropzone];

@NgModule({
  imports: SBB_FILE_SELECTOR_EXPORTED_DECLARATIONS,
  exports: SBB_FILE_SELECTOR_EXPORTED_DECLARATIONS,
})
export class SbbFileSelectorModule {}
