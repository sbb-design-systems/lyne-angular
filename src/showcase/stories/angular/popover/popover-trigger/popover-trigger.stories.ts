import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbPopover, SbbPopoverTrigger } from '@sbb-esta/lyne-angular/popover';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const form: InputType = {
  control: false,
  table: { disable: true },
};

const value: InputType = {
  control: false,
  table: { disable: true },
};

const type: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  form,
  value,
  type,
  name,
  ariaLabel,
};

const args: Args = {
  ariaLabel: 'Click to open the popover',
  iconName: 'circle-information-small',
  disabled: false,
  disabledInteractive: false,
  negative: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbTitle, SbbBlockLink, SbbPopover],
    }),
  ],
  title: 'elements/sbb-popover/sbb-popover-trigger',
  component: SbbPopoverTrigger,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="color: ${args['negative'] ? 'var(--sbb-color-1-negative)' : 'var(--sbb-color-1)'}">
        <span class="sbb-text-s" style="display: flex; align-items: center;">
          <span style="margin-inline-end: var(--sbb-spacing-fixed-1x);"> This is a demo text. </span>
          <sbb-popover-trigger id="popover-trigger" ${argsToTemplate(args)}></sbb-popover-trigger>
        </span>
        <sbb-popover trigger="popover-trigger">
          <sbb-title level="2" visualLevel="6" style="margin-block-start: 0">
            Simple popover with link.
          </sbb-title>
          <p class="sbb-text-s" style="margin: 0;">
            Some content.
            <sbb-block-link
              size="s"
              iconName="chevron-small-right-small"
              iconPlacement="end"
              sbb-popover-close
            >
              Learn More
            </sbb-block-link>
          </p>
        </sbb-popover>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
