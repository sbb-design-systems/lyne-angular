import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkListAnchor } from '@sbb-esta/lyne-angular/link-list/link-list-anchor';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const links = ['Refunds', 'Lost property office', 'Complaints', 'Praise', 'Report property damage'];

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'List Title',
  },
};

const argTypes: ArgTypes = {
  size,
  'title-level': titleLevel,
};

const args: Args = {
  size: size.options![1],
  'title-level': titleLevel.options![0],
  'title-content': 'Help & Contact',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-link-list/sbb-link-list-anchor',
  component: SbbLinkListAnchor,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `
      <sbb-link-list-anchor ${spreadArgs(args)}>
        ${links.map((linkTitle) => {
          return `
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >
              ${linkTitle}
            </sbb-block-link>
          `;
        })}
      </sbb-link-list-anchor>
    `,
  }),
};
export default meta;

export const Default = {};
