import { SbbMiniCalendar } from '@sbb-esta/lyne-angular/mini-calendar';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'elements/sbb-mini-calendar',
  component: SbbMiniCalendar,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-mini-calendar ${argsToTemplate(args)}></sbb-mini-calendar>`,
  }),
};
export default meta;

export const Default = {};
