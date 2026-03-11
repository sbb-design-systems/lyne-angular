import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbPearlChainVerticalModule } from '@sbb-esta/lyne-angular-experimental/pearl-chain-vertical';

/**
 * @title Basic pearl-chain-vertical
 */
@Component({
  selector: 'sbb-pearl-chain-vertical-basic-example',
  templateUrl: 'pearl-chain-vertical-basic-example.html',
  imports: [SbbPearlChainVerticalModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PearlChainVerticalBasicExample {}
