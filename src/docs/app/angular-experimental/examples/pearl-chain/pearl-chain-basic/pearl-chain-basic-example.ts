import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbPearlChainModule } from '@sbb-esta/lyne-angular-experimental/pearl-chain';

/**
 * @title Basic pearl-chain
 */
@Component({
  selector: 'sbb-pearl-chain-basic-example',
  templateUrl: 'pearl-chain-basic-example.html',
  imports: [SbbPearlChainModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PearlChainBasicExample {}
