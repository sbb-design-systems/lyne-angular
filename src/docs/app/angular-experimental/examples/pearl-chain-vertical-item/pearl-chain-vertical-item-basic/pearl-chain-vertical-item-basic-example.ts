import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbPearlChainVerticalItemModule } from '@sbb-esta/lyne-angular-experimental/pearl-chain-vertical-item';

/**
 * @title Basic pearl-chain-vertical-item
 */
@Component({
  selector: 'sbb-pearl-chain-vertical-item-basic-example',
  templateUrl: 'pearl-chain-vertical-item-basic-example.html',
  imports: [SbbPearlChainVerticalItemModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PearlChainVerticalItemBasicExample {}
