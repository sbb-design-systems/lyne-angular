import { SbbLinkListAnchor } from '@sbb-esta/lyne-angular/link-list-anchor';
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
  title: 'elements/sbb-link-list-anchor',
  component: SbbLinkListAnchor,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-link-list-anchor ${argsToTemplate(args)}></sbb-link-list-anchor>`,
  }),
};
export default meta;

export const Default = {};
