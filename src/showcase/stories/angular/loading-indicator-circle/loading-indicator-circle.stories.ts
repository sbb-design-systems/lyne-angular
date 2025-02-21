import { SbbLoadingIndicatorCircle } from '@sbb-esta/lyne-angular/loading-indicator-circle';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../helpers/spread-args';

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'smoke', 'white'],
};

const argTypes: ArgTypes = { color };

const args: Args = { color: color.options![0] };

const meta: Meta = {
  title: 'elements/sbb-loading-indicator-circle',
  component: SbbLoadingIndicatorCircle,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['color'] === 'white' ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div
        ${
          args['color'] === 'white'
            ? 'style="color: var(--sbb-color-white); --sbb-title-text-color-normal-override: var(--sbb-color-white);"'
            : ''
        }
      >
        <p>
          <sbb-loading-indicator-circle ${spreadArgs(args)}></sbb-loading-indicator-circle> Inline loading
          indicator
        </p>
        <sbb-title level="4">
          <sbb-loading-indicator-circle ${spreadArgs(args)}></sbb-loading-indicator-circle> Adaptive to
          font size
        </sbb-title>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
