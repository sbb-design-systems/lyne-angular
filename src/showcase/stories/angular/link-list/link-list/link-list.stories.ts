import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkList } from '@sbb-esta/lyne-angular/link-list/link-list';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const links = ['Refunds', 'Lost property office', 'Complaints', 'Praise', 'Report property damage'];

const orientation: InputType = {
  control: {
    type: 'select',
  },
  options: ['vertical', 'horizontal'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

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
  orientation,
  horizontalFrom,
  size,
  titleLevel,
};

const args: Args = {
  orientation: orientation.options![0],
  horizontalFrom: undefined,
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
  title: 'elements/sbb-link-list/sbb-link-list',
  component: SbbLinkList,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-link-list ${argsToTemplate(args)}>
        ${links.map((linkTitle) => {
          return `
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >
              ${linkTitle}
            </sbb-block-link>
          `;
        })}
      </sbb-link-list>
    `,
  }),
};
export default meta;

export const Default = {};
