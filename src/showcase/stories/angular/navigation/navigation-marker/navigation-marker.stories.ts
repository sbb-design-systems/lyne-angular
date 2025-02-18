import { SbbNavigationButton } from '@sbb-esta/lyne-angular/navigation/navigation-button';
import { SbbNavigationMarker } from '@sbb-esta/lyne-angular/navigation/navigation-marker';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
};

const argTypes: ArgTypes = {
  size,
};

const args: Args = {
  size: size.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbNavigationButton],
    }),
  ],
  title: 'elements/sbb-navigation/sbb-navigation-marker',
  component: SbbNavigationMarker,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: () => 'var(--sbb-color-midnight)',
  },
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `
      <sbb-navigation-marker ${spreadArgs(args)}>
        <sbb-navigation-button id="nav-1">Tickets & Offers</sbb-navigation-button>
        <sbb-navigation-button id="nav-2">
          Vacations & Recreation
        </sbb-navigation-button>
        <sbb-navigation-button id="nav-3">Travel information</sbb-navigation-button>
        <sbb-navigation-button id="nav-4">Help & Contact</sbb-navigation-button>
      </sbb-navigation-marker>
    `,
  }),
};
export default meta;

export const Default = {};
