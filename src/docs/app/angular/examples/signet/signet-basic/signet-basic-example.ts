import { Component } from '@angular/core';
import { SbbSignetModule } from '@sbb-esta/lyne-angular/signet';

/**
 * @title Basic signet
 */
@Component({
  selector: 'sbb-signet-basic-example',
  templateUrl: 'signet-basic-example.html',
  imports: [SbbSignetModule],
})
export class SignetBasicExample {}
