import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const slot: InputType = {
  control: {
    type: 'select',
  },
  options: ['prefix', 'suffix'],
};

const argTypes = { slot };

const args = { slot: slot.options![0], 'icon-name': 'pen-small' };

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField],
    }),
  ],
  title: 'elements/sbb-button/sbb-mini-button',
  component: SbbMiniButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ slot, ...args }: Args) => ({
    props: { ...args },
    template: `
      <sbb-form-field negative=${args['negative']}>
        <label>sbb-mini-button</label>
        <input placeholder="Placeholder" [disabled]=${args['disabled']}>
        <sbb-mini-button ${spreadArgs(args)} slot=${slot}></sbb-mini-button>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
