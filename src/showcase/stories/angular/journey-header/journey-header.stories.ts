import { SbbJourneyHeader } from '@sbb-esta/lyne-angular/journey-header';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '3', '4', '5', '6'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
};

const argTypes: ArgTypes = {
  level,
  size,
};

const args: Args = {
  origin: 'La Chaux de Fonds',
  destination: 'Loèche-les-Bains',
  level: level.options![2],
  size: size.options![1],
  negative: false,
  roundTrip: false,
};

const meta: Meta = {
  title: 'elements/sbb-journey-header',
  component: SbbJourneyHeader,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-journey-header ${argsToTemplate(args)}></sbb-journey-header>`,
  }),
};
export default meta;

export const Default = {};
