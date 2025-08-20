import { SbbDialogContent } from '@sbb-esta/lyne-angular/dialog/dialog-content';
import type { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-dialog/sbb-dialog-content',
  component: SbbDialogContent,
  render: () => ({
    template: `<sbb-dialog-content>This is a dialog content.</sbb-dialog-content>`,
  }),
};
export default meta;

export const Default = {};
