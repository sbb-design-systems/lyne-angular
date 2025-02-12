import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const alignGroup: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const buttonSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const linkSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const argTypes: ArgTypes = {
  'align-group': alignGroup,
  orientation,
  'horizontal-from': horizontalFrom,
  'button-size': buttonSize,
  'link-size': linkSize,
};

const args: Args = {
  'align-group': alignGroup.options![0],
  orientation: orientation.options![0],
  'horizontal-from': horizontalFrom.options![0],
  'button-size': buttonSize.options![0],
  'link-size': linkSize.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbButton, SbbSecondaryButton, SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-action-group',
  component: SbbActionGroup,
  argTypes,
  args,
  parameters: {
    actions: { handles: ['click'] },
  },
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
