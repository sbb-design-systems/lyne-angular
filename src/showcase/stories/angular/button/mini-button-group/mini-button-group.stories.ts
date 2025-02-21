import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';
import { SbbMiniButtonGroup } from '@sbb-esta/lyne-angular/button/mini-button-group';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l', 'xl'],
};

const argTypes = { disabled, size };

const args = { disabled: false, size: size.options![1] };

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbMiniButton, SbbDivider],
    }),
  ],
  title: 'elements/sbb-button/sbb-mini-button-group',
  component: SbbMiniButtonGroup,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ disabled, ...args }: Args) => ({
    props: { disabled, ...args },
    template: `
      <sbb-mini-button-group ${spreadArgs(args)}>
        <sbb-mini-button disabled=${disabled} aria-label="previous" icon-name="chevron-small-left-small"></sbb-mini-button>
        <sbb-mini-button disabled=${disabled} aria-label="next" icon-name="chevron-small-right-small"></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button aria-label="edit" icon-name="pen-small"></sbb-mini-button>
        <sbb-mini-button aria-label="duplicate" icon-name="copy-small"></sbb-mini-button>
        <sbb-mini-button aria-label="delete" icon-name="trash-small"></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button aria-label="bookmark" icon-name="star-small"></sbb-mini-button>
      </sbb-mini-button-group>
    `,
  }),
};
export default meta;

export const Default = {};
