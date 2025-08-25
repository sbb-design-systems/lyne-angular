import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { InputType, StoryContext } from 'storybook/internal/types';

const slot: InputType = {
  control: {
    type: 'select',
  },
  options: ['prefix', 'suffix'],
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes = {
  slot,
  type,
  value,
};

const args = {
  slot: slot.options![0],
  iconName: 'pen-small',
  type: type.options![0],
};

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
      <sbb-form-field [negative]=${args['negative']}>
        <label>sbb-mini-button</label>
        <input placeholder="Placeholder" [disabled]=${args['disabled']}>
        <sbb-mini-button ${argsToTemplate(args)} slot=${slot}></sbb-mini-button>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
