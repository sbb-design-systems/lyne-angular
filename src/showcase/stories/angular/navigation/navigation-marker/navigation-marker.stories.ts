import { SbbNavigationButton, SbbNavigationMarker } from '@sbb-esta/lyne-angular/navigation';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

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
    backgroundColor: () => 'var(--sbb-background-color-1-negative)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-navigation-marker ${argsToTemplate(args)}>
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
