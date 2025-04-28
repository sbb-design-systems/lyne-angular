import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbTimetableOccupancy } from '@sbb-esta/lyne-angular/timetable-occupancy';
import { SbbPearlChainVertical } from '@sbb-esta/lyne-angular-experimental/pearl-chain-vertical';
import { SbbPearlChainVerticalItem } from '@sbb-esta/lyne-angular-experimental/pearl-chain-vertical-item';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const lineType: InputType = {
  options: ['dotted', 'standard', 'thin'],
  control: { type: 'inline-radio' },
  table: { category: 'helper' },
};

const lineColor: InputType = {
  options: ['default', 'disruption', 'past', 'walk'],
  control: { type: 'inline-radio' },
  table: { category: 'helper' },
};

const bulletType: InputType = {
  options: ['default', 'disruption', 'past', 'irrelevant', 'skipped'],
  control: { type: 'inline-radio' },
  table: { category: 'helper' },
};

const bulletSize: InputType = {
  options: ['start-end', 'stop'],
  control: { type: 'inline-radio' },
  table: { category: 'helper' },
};

const hideLine: InputType = {
  control: { type: 'boolean' },
  table: { category: 'helper' },
};

const minHeight: InputType = {
  control: { type: 'number' },
  table: { category: 'helper' },
};

const position: InputType = {
  control: { type: 'number' },
  table: { category: 'helper' },
};

const disableAnimation: InputType = {
  control: { type: 'boolean' },
  table: { category: 'helper' },
};

const argTypes: ArgTypes = {
  lineType,
  lineColor,
  bulletType,
  bulletSize,
  hideLine,
  minHeight,
  position,
  disableAnimation,
};

const args: Args = {
  pearlChainVerticalItemAttributes: {
    lineType: lineType.options![1],
    lineColor: lineColor.options![0],
    bulletType: bulletType.options![0],
    minHeight: 100,
    hideLine: false,
    bulletSize: bulletSize.options![0],
    position: 0,
    disableAnimation: false,
  },
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbPearlChainVerticalItem, SbbIcon, SbbTimetableOccupancy],
    }),
  ],
  title: 'experimental/sbb-pearl-chain-vertical',
  component: SbbPearlChainVertical,
  argTypes,
  args,
  render: ({ pearlChainVerticalItemAttributes }: Args) => ({
    props: { pearlChainVerticalItemAttributes },
    template: `
      <sbb-pearl-chain-vertical>
        <sbb-pearl-chain-vertical-item [pearlChainVerticalItemAttributes]="pearlChainVerticalItemAttributes">
          <div
            slot="right"
            style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
          >
            slot for content
            <div>more</div>
            <div>more</div>
            <div>more</div>
            <div>more</div>
            <div>more</div>
          </div>
        </sbb-pearl-chain-vertical-item>
      </sbb-pearl-chain-vertical>
    `,
  }),
};
export default meta;

export const Default = {};
