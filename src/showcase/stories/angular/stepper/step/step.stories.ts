import { SbbStep } from '@sbb-esta/lyne-angular/stepper';
import type { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-step/sbb-step',
  component: SbbStep,
  render: () => ({
    template: `<sbb-step slot="step" data-selected>Step content.</sbb-step>`,
  }),
};
export default meta;

export const Default = {};
