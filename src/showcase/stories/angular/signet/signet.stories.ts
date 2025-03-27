import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal', 'panel'],
};

const argTypes: ArgTypes = {
  protectiveRoom,
};

const args: Args = {
  protectiveRoom: protectiveRoom.options![0],
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
        <sbb-signet ${argsToTemplate(args)}></sbb-signet>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
