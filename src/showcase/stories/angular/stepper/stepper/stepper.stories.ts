import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbStep } from '@sbb-esta/lyne-angular/stepper/step';
import { SbbStepLabel } from '@sbb-esta/lyne-angular/stepper/step-label';
import { SbbStepper } from '@sbb-esta/lyne-angular/stepper/stepper';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const loremIpsum = `
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
  sanctus est Lorem ipsum dolor sit amet.
`;
const loremIpsumSubstring = [219, 58, 160, 304];

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

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const selected: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const selectedIndex: InputType = {
  control: {
    type: 'number',
  },
};

const argTypes: ArgTypes = {
  orientation,
  horizontalFrom,
  size,
  selected,
  selectedIndex,
};

const args: Args = {
  linear: false,
  orientation: orientation.options![0],
  horizontalFrom: horizontalFrom.options![0],
  size: size.options![1],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard, SbbStepLabel, SbbStep, SbbButton, SbbSecondaryButton],
    }),
  ],
  title: 'elements/sbb-step/sbb-stepper',
  component: SbbStepper,
  argTypes,
  args,
  render: ({ disabled, ...args }: Args) => ({
    props: { disabled, ...args },
    template: `
      <sbb-stepper ${argsToTemplate(args)} aria-label="Purpose of this flow">
        ${['First', 'Second', 'Third', 'Fourth'].map(
          (element, index, arr) => `
              <sbb-step-label [disabled]=${disabled && index === 2}>${element} step</sbb-step-label>
              <sbb-step>
                <div tabindex="0" class="sbb-focus-outline" style="margin-block-end: var(--sbb-spacing-fixed-4x)">
                  ${element} step content. ${loremIpsum.substring(0, loremIpsumSubstring[index])}
                </div>
                ${index !== 0 ? `<sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>` : ''}
                ${index !== arr.length - 1 ? `<sbb-button size="m" sbb-stepper-next>Next</sbb-button>` : ''}
                ${index === arr.length - 1 ? `<sbb-button size="m" sbb-stepper-next>Submit</sbb-button>` : ''}
              </sbb-step>
          `,
        )}
      </sbb-stepper>
      <sbb-card color="milk" style="margin-block-start: var(--sbb-spacing-fixed-8x)">
        Page content: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </sbb-card>
    `,
  }),
};
export default meta;

export const Default = {};
