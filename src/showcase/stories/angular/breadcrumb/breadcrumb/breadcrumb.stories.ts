import { SbbBreadcrumb } from '@sbb-esta/lyne-angular/breadcrumb/breadcrumb';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta } from '@storybook/angular';

import { spreadArgs } from '../../../../tools/spread-args';

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-breadcrumb/sbb-breadcrumb',
  component: SbbBreadcrumb,
  parameters: {
    actions: { handles: ['click'] },
  },

  render: (args) => ({
    props: { ...args },
    template: `<sbb-breadcrumb ${spreadArgs(args)}>Link</sbb-breadcrumb>`,
  }),
};
export default meta;

export const Default = {};
