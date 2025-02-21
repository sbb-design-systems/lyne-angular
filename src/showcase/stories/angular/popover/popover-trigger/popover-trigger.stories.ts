import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbPopoverTrigger } from '@sbb-esta/lyne-angular/popover/popover-trigger';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const args: Args = {
  'aria-label': 'Click to open the popover',
  'icon-name': 'circle-information-small',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbTitle, SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-popover/sbb-popover-trigger',
  component: SbbPopoverTrigger,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="color: ${args['negative'] ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)'}">
        <span class="sbb-text-s" style="display: flex; align-items: center;">
          <span style="margin-inline-end: var(--sbb-spacing-fixed-1x);"> This is a demo text. </span>
          <sbb-popover-trigger id="popover-trigger" ${spreadArgs(args)}></sbb-popover-trigger>
        </span>
        <sbb-popover trigger="popover-trigger">
          <sbb-title level="2" visual-level="6" style="margin-block-start: 0">
            Simple popover with link.
          </sbb-title>
          <p class="sbb-text-s" style="margin: 0;">
            Some content.
            <sbb-block-link
              size="s"
              icon-name="chevron-small-right-small"
              icon-placement="end"
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
