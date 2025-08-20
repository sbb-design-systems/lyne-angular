import { SbbAlert } from '@sbb-esta/lyne-angular/alert/alert';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['m', 'l', 's'],
};

const animation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['all', 'open', 'close', 'none'],
};

const argTypes: ArgTypes = {
  text,
  size,
  animation,
};

const args: Args = {
  text: "Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times and changed connections.",
  size: size.options![0],
  readOnly: false,
  iconName: 'info',
  animation: animation.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbLink, SbbTitle],
    }),
  ],
  title: 'elements/sbb-alert/sbb-alert',
  component: SbbAlert,
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `
      <sbb-alert ${argsToTemplate(args)}>
        <sbb-title>Interruption between Berne and Olten</sbb-title>
        ${text}
        <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
      </sbb-alert>`,
  }),
};
export default meta;

export const Default = {};
