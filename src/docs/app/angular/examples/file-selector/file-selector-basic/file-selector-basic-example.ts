import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFileSelectorModule } from '@sbb-esta/lyne-angular/file-selector';

/**
 * @title Basic file-selector
 */
@Component({
  selector: 'sbb-file-selector-basic-example',
  templateUrl: 'file-selector-basic-example.html',
  imports: [SbbFileSelectorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectorBasicExample {}
