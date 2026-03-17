import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';

/**
 * @title Basic checkbox-group
 */
@Component({
  selector: 'sbb-checkbox-group-basic-example',
  templateUrl: 'checkbox-group-basic-example.html',
  imports: [SbbCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupBasicExample {}
