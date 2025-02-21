import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../helpers/spread-args';

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'],
};

const argTypes: ArgTypes = { 'protective-room': protectiveRoom };

const args: Args = { 'protective-room': protectiveRoom.options![0] };

const meta: Meta = {
  title: 'elements/sbb-logo',
  component: SbbLogo,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style='max-width: 300px;'>
        <sbb-logo ${spreadArgs(args)}></sbb-logo>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
