import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';

/**
 * @title Basic header
 */
@Component({
  selector: 'sbb-header-basic-example',
  templateUrl: 'header-basic-example.html',
  imports: [SbbHeaderModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBasicExample {}
