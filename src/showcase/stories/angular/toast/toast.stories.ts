import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbTransparentButton } from '@sbb-esta/lyne-angular/button/transparent-button';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbToast } from '@sbb-esta/lyne-angular/toast';
import type { SbbButtonElement } from '@sbb-esta/lyne-elements/button/button.js';
import type { SbbToastElement } from '@sbb-esta/lyne-elements/toast.js';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import readme from './readme.md';

const openToast = (event: Event) => {
  ((event.currentTarget as SbbButtonElement).parentElement!.querySelector(
    'sbb-toast',
  ) as SbbToastElement)!.open();
};

const action: InputType = {
  control: {
    type: 'select',
  },
  options: [null, 'button', 'link'],
};

const position: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'top-left',
    'top-center',
    'top-right',
    'top-start',
    'top-end',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'bottom-start',
    'bottom-end',
  ],
};

const timeout: InputType = {
  control: {
    type: 'number',
    step: 500,
  },
};

const politeness: InputType = {
  control: {
    type: 'select',
  },
  options: ['assertive', 'polite', 'off'],
};

const argTypes: ArgTypes = {
  action,
  position,
  timeout,
  politeness,
};

const args: Args = {
  iconName: 'circle-tick-small',
  action: action.options![0],
  position: position.options![6],
  timeout: 6000,
  politeness: politeness.options![1],
  readOnly: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbButton, SbbTransparentButton, SbbLink],
    }),
  ],
  title: 'elements/sbb-toast',
  component: SbbToast,
  parameters: {
    actions: { handles: ['click'] },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...argTypes,
    openToast: { type: 'function', control: false, table: { disable: true } },
  },
  args: {
    ...args,
    openToast: (e: Event) => openToast(e),
  },
  render: ({ action, ...args }: Args) => ({
    props: { action, ...args },
    template: `
      <sbb-button (click)="openToast($event)">Show toast</sbb-button>
      <sbb-toast ${argsToTemplate(args)}>
        Lorem ipsum dolor amet.
        ${
          action === 'button'
            ? `<sbb-transparent-button slot="action" iconName="clock-small" aria-label="Remind me later" sbb-toast-close></sbb-transparent-button>`
            : ''
        }
        ${
          action === 'link'
            ? `<sbb-link slot="action" sbb-toast-close href="https://www.sbb.ch" target="_blank">Link action</sbb-link>`
            : ''
        }
      </sbb-toast>
    `,
  }),
};
export default meta;

export const Default = {};
