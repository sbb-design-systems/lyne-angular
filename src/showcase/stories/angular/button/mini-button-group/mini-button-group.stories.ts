import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';
import { SbbMiniButtonGroup } from '@sbb-esta/lyne-angular/button/mini-button-group';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { InputType, StoryContext } from 'storybook/internal/types';

const disabled: InputType = {
  control: {
    type: 'boolean',
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
      <sbb-mini-button-group ${argsToTemplate(args)}>
        <sbb-mini-button [disabled]="disabled" aria-label="previous" iconName="chevron-small-left-small"></sbb-mini-button>
        <sbb-mini-button [disabled]="disabled" aria-label="next" iconName="chevron-small-right-small"></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button aria-label="edit" iconName="pen-small"></sbb-mini-button>
        <sbb-mini-button aria-label="duplicate" iconName="copy-small"></sbb-mini-button>
        <sbb-mini-button aria-label="delete" iconName="trash-small"></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button aria-label="bookmark" iconName="star-small"></sbb-mini-button>
      </sbb-mini-button-group>
    `,
  }),
};
export default meta;

export const Default = {};
