import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkListAnchor } from '@sbb-esta/lyne-angular/link-list/link-list-anchor';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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
};

const argTypes: ArgTypes = {
  size,
  titleLevel,
};

const args: Args = {
  size: size.options![1],
  titleLevel: titleLevel.options![0],
  titleContent: 'Help & Contact',
  negative: false,
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
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-link-list-anchor ${argsToTemplate(args)}>
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
