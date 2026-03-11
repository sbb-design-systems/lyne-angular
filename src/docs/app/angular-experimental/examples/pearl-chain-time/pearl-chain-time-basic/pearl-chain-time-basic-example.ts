import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbPearlChainTimeModule } from '@sbb-esta/lyne-angular-experimental/pearl-chain-time';

/**
 * @title Basic pearl-chain-time
 */
@Component({
  selector: 'sbb-pearl-chain-time-basic-example',
  templateUrl: 'pearl-chain-time-basic-example.html',
  imports: [SbbPearlChainTimeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PearlChainTimeBasicExample {}
