import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';

/**
 * @title Basic divider
 */
@Component({
  selector: 'sbb-divider-basic-example',
  templateUrl: 'divider-basic-example.html',
  imports: [SbbDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerBasicExample {}
