import { SbbDatepicker } from './datepicker/datepicker';
import { SbbDatepickerNextDay } from './datepicker-next-day/datepicker-next-day';
import { SbbDatepickerPreviousDay } from './datepicker-previous-day/datepicker-previous-day';
import { SbbDatepickerToggle } from './datepicker-toggle/datepicker-toggle';

export const SbbDatepickerModule = [
  SbbDatepicker,
  SbbDatepickerNextDay,
  SbbDatepickerPreviousDay,
  SbbDatepickerToggle,
] as const;
