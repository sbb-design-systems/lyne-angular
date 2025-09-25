import type { Args, Meta } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const striped: InputType = {
  control: {
    type: 'boolean',
  },
};

const colorTheme: InputType = {
  options: ['none', 'iron'],
  control: {
    type: 'select',
  },
};

const argTypes: ArgTypes = {
  size,
  negative,
  striped,
  colorTheme,
};

const args: Args = {
  size: size.options![2],
  negative: false,
  striped: true,
  colorTheme: colorTheme.options![0],
};

const caption: () => string = () => `
  <caption>
    Front-end web developer course 2021
  </caption>
`;

const header: () => string = () => `
  <thead>
    <tr>
      <th>Person</th>
      <th>Most interest in</th>
      <th>Age</th>
    </tr>
  </thead>
`;

const body: () => string = () => `
  <tbody>
    <tr>
      <td>Chris</td>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <td>Dennis</td>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <td>Sarah</td>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <td>KAREN</td>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
`;

const Template = (args: Args): string => {
  let cssClass = '';
  if (args['negative']) {
    cssClass += 'sbb-table--negative ';
  }
  switch (args['size']) {
    case 'xs':
      cssClass += 'sbb-table-xs ';
      break;
    case 's':
      cssClass += 'sbb-table-s ';
      break;
    case 'm':
      cssClass += 'sbb-table-m ';
      break;
    default:
      break;
  }
  if (!args['striped']) {
    cssClass += 'sbb-table--unstriped ';
  }
  if (args['colorTheme'] === 'iron') {
    cssClass += 'sbb-table--theme-iron';
  }

  return `
    <table class="${cssClass}">
      ${caption()} ${header()} ${body()}
    </table>
  `;
};

export const Default = {
  argTypes: argTypes,
  args: { ...args },
};

export const SizeS = {
  argTypes: argTypes,
  args: { ...args, size: 's' },
};

export const SizeXS = {
  argTypes: argTypes,
  args: { ...args, size: 'xs' },
};

export const Negative = {
  argTypes: argTypes,
  args: { ...args, negative: true },
};

export const IronTheme = {
  argTypes: argTypes,
  args: { ...args, colorTheme: 'iron' },
};

const meta: Meta = {
  render: (args: Args) => ({
    template: Template(args),
  }),
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  title: 'styles/table',
};

export default meta;
