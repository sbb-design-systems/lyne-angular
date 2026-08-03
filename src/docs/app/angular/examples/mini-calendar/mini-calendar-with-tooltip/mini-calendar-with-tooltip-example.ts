import { Component } from '@angular/core';
import { SbbMiniCalendarModule } from '@sbb-esta/lyne-angular/mini-calendar';

/**
 * @title Mini-calendar with tooltip
 */
@Component({
  selector: 'sbb-mini-calendar-with-tooltip-example',
  templateUrl: 'mini-calendar-with-tooltip-example.html',
  imports: [SbbMiniCalendarModule],
})
export class MiniCalendarWithTooltipExample {
  protected days = Array.from({ length: 31 }, (_, d) => String(d + 1).padStart(2, '0'));
}
