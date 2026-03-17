import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title Basic select
 */
@Component({
  selector: 'sbb-select-basic-example',
  templateUrl: 'select-basic-example.html',
  imports: [SbbSelectModule, SbbFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicExample {}
