import { Args, Meta } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
  ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
  no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const Template = (args: Args): string => {
  let cssClass = 'overflow-container';
  let scrollbarClass = ' sbb-scrollbar';
  if (args['size'] === 'thick') {
    scrollbarClass += '-thick';
  }
  if (args['negative']) {
    scrollbarClass += '-negative';
    cssClass += ' negative';
  }
  if (args['trackVisible']) {
    scrollbarClass += '-track-visible';
  }
  cssClass += scrollbarClass;

  return `
    <div class="${cssClass}">
      <div class="inner-box">${text}</div>
    </div>
  `;
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['thin', 'thick'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const trackVisible: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  size,
  negative,
  trackVisible,
};

const args: Args = {
  size: size.options![0],
  negative: false,
  trackVisible: false,
};

export const Thin = {
  argTypes: argTypes,
  args: { ...args },
};

export const ThinTrackVisible = {
  argTypes: argTypes,
  args: { ...args, trackVisible: true },
};

export const ThinNegative = {
  argTypes: argTypes,
  args: { ...args, negative: true },
};

export const ThinNegativeTrackVisible = {
  argTypes: argTypes,
  args: { ...args, negative: true, trackVisible: true },
};

export const Thick = {
  argTypes: argTypes,
  args: { ...args, size: size.options![1] },
};

export const ThickTrackVisible = {
  argTypes: argTypes,
  args: { ...args, size: size.options![1], trackVisible: true },
};

export const ThickNegative = {
  argTypes: argTypes,
  args: { ...args, size: size.options![1], negative: true },
};

export const ThickNegativeTrackVisible = {
  argTypes: argTypes,
  args: {
    ...args,
    size: size.options![1],
    negative: true,
    trackVisible: true,
  },
};

const meta: Meta = {
  render: (args: Args) => ({
    props: { ...args },
    template: Template(args),
  }),
  title: 'styles/scrollbar',
};

export default meta;
