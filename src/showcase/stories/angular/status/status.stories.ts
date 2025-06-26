import { SbbStatus } from '@sbb-esta/lyne-angular/status';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'info',
    'success',
    'warning',
    'error',
    'pending',
    'incomplete',
    'not-started',
    'in-progress',
  ],
};

const title: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  type,
  title,
  text,
};

const args: Args = {
  type: type.options![0],
  title: 'Title',
  text: 'Status info text',
};

const meta: Meta = {
  title: 'elements/sbb-status',
  component: SbbStatus,
  decorators: [
    moduleMetadata({
      imports: [SbbTitle],
    }),
  ],
  argTypes,
  args,
  render: ({ title, text, ...args }: Args) => ({
    props: { title, text, ...args },
    template: `
    <sbb-status ${argsToTemplate(args)}>
      @if (title) {
        <sbb-title>${title}</sbb-title>
      }
      ${text}
    </sbb-status>`,
  }),
};
export default meta;

export const Default = {};
