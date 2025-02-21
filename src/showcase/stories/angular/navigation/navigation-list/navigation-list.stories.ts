import { SbbNavigationButton } from '@sbb-esta/lyne-angular/navigation/navigation-button';
import { SbbNavigationList } from '@sbb-esta/lyne-angular/navigation/navigation-list';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
};

const args: Args = {
  label: 'Label',
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbNavigationButton],
    }),
  ],
  title: 'elements/sbb-navigation/sbb-navigation-list',
  component: SbbNavigationList,
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-navigation-list ${spreadArgs(args)}>
        <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
        <sbb-navigation-button>Vacations & Recreation</sbb-navigation-button>
        <sbb-navigation-button>Travel information</sbb-navigation-button>
        <sbb-navigation-button>Help & Contact</sbb-navigation-button>
      </sbb-navigation-list>
    `,
  }),
};
export default meta;

export const Default = {};
