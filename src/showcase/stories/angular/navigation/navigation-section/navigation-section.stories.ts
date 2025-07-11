import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbNavigation } from '@sbb-esta/lyne-angular/navigation/navigation';
import { SbbNavigationList } from '@sbb-esta/lyne-angular/navigation/navigation-list';
import { SbbNavigationMarker } from '@sbb-esta/lyne-angular/navigation/navigation-marker';
import { SbbNavigationSection } from '@sbb-esta/lyne-angular/navigation/navigation-section';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

const trigger: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const navigationList = (label: string): string => `
  <sbb-navigation-list label=${label}>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-link size="m" href="https://www.sbb.ch/en/"> Label </sbb-navigation-link>
  </sbb-navigation-list>
`;

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [
        SbbSecondaryButton,
        SbbNavigation,
        SbbNavigationMarker,
        SbbNavigationSection,
        SbbNavigationList,
        SbbSecondaryButton,
      ],
    }),
  ],
  title: 'elements/sbb-navigation/sbb-navigation-section',
  component: SbbNavigationSection,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes: { trigger },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-secondary-button id="navigation-trigger" size="l" iconName="hamburger-menu-small"></sbb-secondary-button>
      <sbb-navigation id="navigation" trigger="navigation-trigger">
        <sbb-navigation-marker id="nav-marker">
          <sbb-navigation-button id="nav-1">Label 1</sbb-navigation-button>
          <sbb-navigation-button id="nav-2">Label 2</sbb-navigation-button>
          <sbb-navigation-button id="nav-3">Label 3</sbb-navigation-button>
        </sbb-navigation-marker>

        <sbb-navigation-section titleContent="Title one" id="navigation-section" trigger="nav-1" ${argsToTemplate(args)}>
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
          <sbb-button size="m" style="width: fit-content;"> Button </sbb-button>
        </sbb-navigation-section>

        <sbb-navigation-section titleContent="Title two" id="navigation-section" trigger="nav-2" ${argsToTemplate(args)}>
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
          ${navigationList('Label')} ${navigationList('Label')}
          <sbb-secondary-button size="m" style="width: fit-content;" sbb-navigation-close>
            Close navigation
          </sbb-secondary-button>
        </sbb-navigation-section>
      </sbb-navigation>
    `,
  }),
};
export default meta;

export const Default = {};
