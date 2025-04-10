import { SbbBreadcrumb } from '@sbb-esta/lyne-angular/breadcrumb/breadcrumb';
import { SbbBreadcrumbGroup } from '@sbb-esta/lyne-angular/breadcrumb/breadcrumb-group';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const numberOfBreadcrumbs: InputType = { control: { type: 'number' } };

const text: InputType = { control: { type: 'text' } };

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Breadcrumb',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const argTypes: ArgTypes = {
  numberOfBreadcrumbs,
  text,
  href,
  target,
  rel,
  download,
  iconName,
};

const args: Args = {
  numberOfBreadcrumbs: 3,
  text: 'Breadcrumb',
  href: href.options![0],
};

const meta: Meta = {
  decorators: [withActions, moduleMetadata({ imports: [SbbBreadcrumb] })],
  title: 'elements/sbb-breadcrumb/sbb-breadcrumb-group',
  component: SbbBreadcrumbGroup,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ numberOfBreadcrumbs, text, ...args }: Args) => ({
    props: { numberOfBreadcrumbs, text, ...args },
    template: `
      <sbb-breadcrumb-group>
        <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
        ${new Array(numberOfBreadcrumbs - 1)
          .fill(undefined)
          .map(
            (_, i) => `<sbb-breadcrumb ${argsToTemplate(args)}>${text} ${i + 1}</sbb-breadcrumb>`,
          )}
      </sbb-breadcrumb-group>
    `,
  }),
};
export default meta;

export const Default = {};
