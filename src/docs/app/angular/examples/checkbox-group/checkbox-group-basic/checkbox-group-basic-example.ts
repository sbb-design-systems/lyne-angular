import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCheckboxGroupModule } from '@sbb-esta/lyne-angular/checkbox-group';

/**
 * @title Basic checkbox-group
 */
@Component({
  selector: 'sbb-checkbox-group-basic-example',
  templateUrl: 'checkbox-group-basic-example.html',
  imports: [SbbCheckboxGroupModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupBasicExample {}
