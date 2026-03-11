import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTableModule } from '@sbb-esta/lyne-angular/table';

/**
 * @title Basic table
 */
@Component({
  selector: 'sbb-table-basic-example',
  templateUrl: 'table-basic-example.html',
  imports: [SbbTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBasicExample {}
