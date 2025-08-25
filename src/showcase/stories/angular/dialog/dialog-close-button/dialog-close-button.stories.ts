import { SbbDialogCloseButton } from '@sbb-esta/lyne-angular/dialog';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-dialog/sbb-dialog-close-button',
  component: SbbDialogCloseButton,
  parameters: {
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-dialog-close-button ${argsToTemplate(args)}></sbb-dialog-close-button>`,
  }),
};
export default meta;

export const Default = {};
