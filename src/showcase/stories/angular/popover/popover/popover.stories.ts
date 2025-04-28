import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbPopover } from '@sbb-esta/lyne-angular/popover/popover';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const trigger: InputType = {
  control: false,
  table: { disable: true },
};

const positions = [
  'inset-inline-start: 2rem;',
  'inset-inline-start: calc(50% - 44px);',
  'inset-inline-end: 2rem;',
  'inset-block-end: 2rem;',
  'inset-inline-start: calc(50% - 44px); inset-block-end: 2rem;',
  'inset-inline-end: 2rem; inset-block-end: 2rem;',
];
const triggerPosition: InputType = {
  options: Object.keys(positions),
  mapping: positions,
  control: {
    type: 'select',
    labels: {
      0: 'top start',
      1: 'top center',
      2: 'top end',
      3: 'bottom start',
      4: 'bottom center',
      5: 'bottom end',
    },
  },
};

const argTypes: ArgTypes = {
  trigger,
  triggerPosition,
};

const args: Args = {
  triggerPosition: triggerPosition.options![0],
  hoverTrigger: false,
  hideCloseButton: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbTitle, SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-popover/sbb-popover',
  component: SbbPopover,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ triggerPosition, ...args }: Args) => ({
    props: { ...args },
    template: `
      <sbb-popover-trigger
        style="margin-inline: 2rem; position: absolute; cursor: pointer; ${triggerPosition}"
        id="popover-trigger"
      ></sbb-popover-trigger>
      <sbb-popover trigger="popover-trigger" ${argsToTemplate(args)}>
        <sbb-title level="2" visualLevel="6" style="margin-block-start: 0"> Title. </sbb-title>
        <p style="margin: 0" class="sbb-text-s">
          Some content.
          <sbb-block-link
            size="s"
            iconName="chevron-small-right-small"
            iconPlacement="end"
            href="https://www.sbb.ch"
            sbb-popover-close
          >
            Learn More
          </sbb-block-link>
        </p>
      </sbb-popover>
    `,
  }),
};
export default meta;

export const Default = {};
