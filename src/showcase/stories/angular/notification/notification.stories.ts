import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbNotification } from '@sbb-esta/lyne-angular/notification';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['info', 'success', 'warn', 'error'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const animation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['all', 'close', 'open', 'none'],
};

const titleLevel: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  type,
  size,
  animation,
  titleLevel,
};

const args: Args = {
  titleContent: 'Title',
  type: type.options![0],
  size: size.options![1],
  animation: animation.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbSecondaryButton, SbbLink],
    }),
  ],
  title: 'elements/sbb-notification',
  component: SbbNotification,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="display: flex; gap: var(--sbb-spacing-fixed-4x); flex-direction: column;">
        <div
          class="notification-container"
          style="display: flex; flex-direction: column;"
          aria-live="polite"
        >
          <sbb-notification
            ${argsToTemplate(args)}
            style="--sbb-notification-margin: 0 0 var(--sbb-spacing-fixed-4x) 0;"
          >
            The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
            dog.&nbsp;<sbb-link href="/"> Link one</sbb-link>&nbsp;
            <sbb-link href="/"> Link two</sbb-link>&nbsp;
            <sbb-link href="/"> Link three</sbb-link>
          </sbb-notification>
        </div>
        <p style="margin: 0;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          <sbb-link href="/"> link </sbb-link>
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
