import { SbbPearlChainVertical } from '@sbb-esta/lyne-angular-experimental/pearl-chain-vertical';
import { SbbPearlChainVerticalItem } from '@sbb-esta/lyne-angular-experimental/pearl-chain-vertical-item';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const lineType: InputType = {
  control: { type: 'inline-radio' },
  options: ['dotted', 'standard', 'thin'],
  table: { category: 'helper' },
};

const lineColor: InputType = {
  control: { type: 'inline-radio' },
  options: ['default', 'disruption', 'past', 'sky'],
  table: { category: 'helper' },
};

const bulletType: InputType = {
  control: { type: 'inline-radio' },
  options: ['default', 'disruption', 'past', 'irrelevant', 'skipped'],
  table: { category: 'helper' },
};

const bulletSize: InputType = {
  control: { type: 'inline-radio' },
  options: ['start-end', 'stop'],
  table: { category: 'helper' },
};

const argTypes: ArgTypes = {
  lineType,
  lineColor,
  bulletType,
  bulletSize,
};

const args: Args = {
  pearlChainVerticalItemAttributes: {
    minHeight: '100',
    hideLine: false,
    lineType: lineType.options![0],
    lineColor: lineColor.options![0],
    bulletType: bulletType.options![0],
    bulletSize: bulletSize.options![0],
  },
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbPearlChainVertical],
    }),
  ],
  title: 'experimental/sbb-pearl-chain-vertical-item',
  component: SbbPearlChainVerticalItem,
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
