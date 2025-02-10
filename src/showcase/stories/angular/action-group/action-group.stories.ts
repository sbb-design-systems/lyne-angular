import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../tools/spread-args';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbButton, SbbSecondaryButton, SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-action-group',
  component: SbbActionGroup,
  parameters: {
    actions: { handles: ['click'] },
  },
  // render via template is needed due to the directive implementation
  render: ({ ...args }) => ({
    props: { ...args },
    template: `
      <sbb-action-group ${spreadArgs(args)}>
        <sbb-button>Button 1</sbb-button>
        <sbb-secondary-button>Button 2</sbb-secondary-button>
        <sbb-block-link href="/" icon-name="chevron-small-left-small">Link</sbb-block-link>
      </sbb-action-group>`,
  }),
};
export default meta;

export const Default = {};
