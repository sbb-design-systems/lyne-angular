import { SbbAlert } from '@sbb-esta/lyne-angular/alert/alert';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const argTypes: ArgTypes = {
  'title-content': titleContent,
  text,
  'title-level': titleLevel,
};

const args: Args = {
  'title-content': 'Interruption between Berne and Olten',
  text: "Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times and changed connections.",
  'title-level': titleLevel.options![2],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbLink],
    }),
  ],
  title: 'elements/sbb-alert/sbb-alert',
  component: SbbAlert,
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `
      <sbb-alert ${spreadArgs(args)}>
        ${text}
        <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
      </sbb-alert>`,
  }),
};
export default meta;

export const Default = {};
