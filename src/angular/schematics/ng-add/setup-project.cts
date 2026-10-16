import { NgAddOptionsSchema } from './schema';
import { Rule } from '@angular-devkit/schematics';

import { setupLyneTheme } from '../setup-lyne.cjs';

export default function (options: NgAddOptionsSchema): Rule {
  return setupLyneTheme(options, options.theme);
}
