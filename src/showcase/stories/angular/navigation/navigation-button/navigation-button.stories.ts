import { SbbNavigationButton } from '@sbb-esta/lyne-angular/navigation/navigation-button';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
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

const connectedSection: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const argTypes: ArgTypes = {
  label,
  size,
  type,
  value,
  connectedSection,
};

const args: Args = {
  label: 'Label',
  size: size.options![0],
  type: type.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-navigation/sbb-navigation-button',
  component: SbbNavigationButton,
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
  },
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-navigation-button ${argsToTemplate(args)}>${label}</sbb-navigation-button>`,
  }),
};
export default meta;

export const Default = {};
