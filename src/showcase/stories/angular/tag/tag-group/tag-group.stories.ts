import { SbbTag } from '@sbb-esta/lyne-angular/tag/tag';
import { SbbTagGroup } from '@sbb-esta/lyne-angular/tag/tag-group';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const argTypes: ArgTypes = {
  label,
  value,
  size,
};

const args: Args = {
  label: 'Label',
  multiple: true,
  size: size.options![1],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTag],
    }),
  ],
  title: 'elements/sbb-tag/sbb-tag-group',
  component: SbbTagGroup,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `
      <sbb-tag-group ${argsToTemplate(args)}>
        ${new Array(8).fill(null).map(
          (_e, i) => `
          <sbb-tag [checked]=${i === 0} value=${label} amount="123" icon-name="pie-small">
            ${label} ${i + 1}
          </sbb-tag>
        `,
        )}
      </sbb-tag-group>
    `,
  }),
};
export default meta;

export const Default = {};
