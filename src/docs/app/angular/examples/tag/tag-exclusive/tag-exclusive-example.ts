import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';

/**
 * @title exclusive tag-group
 * @order 2
 */
@Component({
  selector: 'sbb-tag-exclusive-example',
  templateUrl: 'tag-exclusive-example.html',
  imports: [SbbTagModule, SbbCardModule, TitleCasePipe],
})
export class TagExclusiveExample {}
