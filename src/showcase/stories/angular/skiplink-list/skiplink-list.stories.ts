import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbSkiplinkList } from '@sbb-esta/lyne-angular/skiplink-list';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://www.sbb.ch/en/help-and-contact.html',
  'https://github.com/sbb-design-systems/lyne-components',
];

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
};

const labelFirstLink: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const labelSecondLink: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const hrefFirstLink: InputType = {
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
    category: 'Links',
  },
};

const hrefSecondLink: InputType = {
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
    category: 'Links',
  },
};

const argTypes: ArgTypes = {
  'title-level': titleLevel,
  labelFirstLink,
  hrefFirstLink,
  labelSecondLink,
  hrefSecondLink,
};

const args: Args = {
  'title-level': undefined,
  'title-content': undefined,
  labelFirstLink: 'To content',
  hrefFirstLink: hrefFirstLink.options![0],
  labelSecondLink: 'To help',
  hrefSecondLink: hrefSecondLink.options![1],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbBlockLink, SbbTitle],
    }),
  ],
  title: 'elements/sbb-skiplink-list',
  component: SbbSkiplinkList,
  argTypes,
  args,
  render: ({ labelFirstLink, hrefFirstLink, labelSecondLink, hrefSecondLink, ...args }: Args) => ({
    props: { labelFirstLink, hrefFirstLink, labelSecondLink, hrefSecondLink, ...args },
    template: `
      <sbb-skiplink-list ${argsToTemplate(args)}>
        <sbb-block-link href="${hrefFirstLink}">${labelFirstLink}</sbb-block-link>
        <sbb-block-link href="${hrefSecondLink}">${labelSecondLink}</sbb-block-link>
      </sbb-skiplink-list>
      <sbb-title level="4">Use TAB to see the skiplink box</sbb-title>
    `,
  }),
};
export default meta;

export const Default = {};
