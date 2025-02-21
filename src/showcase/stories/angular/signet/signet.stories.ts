import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../helpers/spread-args';

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal', 'panel'],
};

const argTypes: ArgTypes = {
  'protective-room': protectiveRoom,
};

const args: Args = {
  'protective-room': protectiveRoom.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-signet',
  component: SbbSignet,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="max-width: 300px;">
        <sbb-signet ${spreadArgs(args)}></sbb-signet>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
