import { withActions } from '@storybook/addon-actions/decorator';
import { Meta } from '@storybook/angular';

import { SbbButtonDirective } from '../angular/button/button';

// FIXME
function argsToTemplate(args: Record<string, unknown>) {
  return Object.entries(args)
    .filter(([key]) => args[key] !== undefined && args[key] !== false)
    .map(([key, value]) => {
      let a;
      if (typeof value === 'function') {
        a = `(${key})="${[key]}($event)"`;
      } else {
        a = `${key}="${value}"`;
      }
      return a;
    })
    .join(' ');
}

const meta: Meta = {
  decorators: [withActions],
  component: SbbButtonDirective,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  render: (args) => ({
    prop: args,
    template: `<sbb-button ${argsToTemplate(args)}>Test</sbb-button>`,
  }),
};
export default meta;

export const Test = {
  args: {
    'icon-name': 'pie-small',
  },
};
