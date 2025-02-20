import { SbbStepLabel } from '@sbb-esta/lyne-angular/stepper/step-label';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
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
  render: ({ label, ...args }) => ({
    props: { label, ...args },
    template: `<sbb-step-label slot="step-label" ${spreadArgs(args)}>${label}</sbb-step-label>`,
  }),
};
export default meta;

export const Default = {};
