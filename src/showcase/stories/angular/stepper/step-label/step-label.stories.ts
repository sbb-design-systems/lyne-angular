import { SbbStepLabel } from '@sbb-esta/lyne-angular/stepper/step-label';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
  value,
};

const args: Args = {
  label: 'Label',
  'icon-name': 'tick-small',
};

const meta: Meta = {
  title: 'elements/sbb-step/sbb-step-label',
  component: SbbStepLabel,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-step-label slot="step-label" ${argsToTemplate(args)}>${label}</sbb-step-label>`,
  }),
};
export default meta;

export const Default = {};
