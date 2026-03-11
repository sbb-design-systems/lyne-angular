import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbVisualCheckboxModule } from '@sbb-esta/lyne-angular/visual-checkbox';

/**
 * @title Basic visual-checkbox
 */
@Component({
  selector: 'sbb-visual-checkbox-basic-example',
  templateUrl: 'visual-checkbox-basic-example.html',
  imports: [SbbVisualCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualCheckboxBasicExample {}
