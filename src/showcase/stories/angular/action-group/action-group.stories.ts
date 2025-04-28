import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

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
  options: [...breakpoints],
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
  alignGroup,
  orientation,
  horizontalFrom,
  buttonSize,
  linkSize,
};

const args: Args = {
  alignGroup: alignGroup.options![0],
  orientation: orientation.options![0],
  horizontalFrom: horizontalFrom.options![0],
  buttonSize: buttonSize.options![0],
  linkSize: linkSize.options![0],
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
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-action-group ${argsToTemplate(args)}>
        <sbb-button>Button 1</sbb-button>
        <sbb-secondary-button>Button 2</sbb-secondary-button>
        <sbb-block-link href="/" iconName="chevron-small-left-small">Link</sbb-block-link>
      </sbb-action-group>`,
  }),
};
export default meta;

export const Default = {};
