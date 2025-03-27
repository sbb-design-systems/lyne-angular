import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbDialogActions } from '@sbb-esta/lyne-angular/dialog/dialog-actions';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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
      imports: [SbbButton, SbbBlockLink, SbbSecondaryButton],
    }),
  ],
  title: 'elements/sbb-dialog/sbb-dialog-actions',
  component: SbbDialogActions,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-dialog-actions ${argsToTemplate(args)}>
      <sbb-block-link
        icon-name="chevron-small-left-small"
        href="https://www.sbb.ch/en/"
        sbb-dialog-close
      >
        Link
      </sbb-block-link>
      <sbb-secondary-button sbb-dialog-close> Cancel </sbb-secondary-button>
      <sbb-button sbb-dialog-close> Confirm </sbb-button>
    </sbb-dialog-actions>
    `,
  }),
};
export default meta;

export const Default = {};
