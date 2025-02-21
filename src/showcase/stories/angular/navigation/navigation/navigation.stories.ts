import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbNavigation } from '@sbb-esta/lyne-angular/navigation/navigation';
import { SbbNavigationButton } from '@sbb-esta/lyne-angular/navigation/navigation-button';
import { SbbNavigationLink } from '@sbb-esta/lyne-angular/navigation/navigation-link';
import { SbbNavigationList } from '@sbb-esta/lyne-angular/navigation/navigation-list';
import { SbbNavigationMarker } from '@sbb-esta/lyne-angular/navigation/navigation-marker';
import { SbbNavigationSection } from '@sbb-esta/lyne-angular/navigation/navigation-section';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../../helpers/spread-args';

const navigationActionsL = (): string => `
  <sbb-navigation-button id="nav-1">Tickets & Offers</sbb-navigation-button>
  <sbb-navigation-button id="nav-2" class="sbb-active" aria-current="page"
    >Vacations & Recreation</sbb-navigation-button
  >
  <sbb-navigation-button id="nav-3">Travel information</sbb-navigation-button>
  <sbb-navigation-link id="nav-4" href="https://www.sbb.ch/en/">
    Help & Contact
  </sbb-navigation-link>
`;

const navigationActionsS = (): string => `
  <sbb-navigation-button id="nav-5" aria-pressed="false">Deutsch</sbb-navigation-button>
  <sbb-navigation-button id="nav-6" aria-pressed="false">Français</sbb-navigation-button>
  <sbb-navigation-button id="nav-7" aria-pressed="true" class="sbb-active">Italiano</sbb-navigation-button
  >
  <sbb-navigation-button id="nav-8" aria-pressed="false">English</sbb-navigation-button>
`;

const navigationList = (label: string, active?: boolean): string => `
  <sbb-navigation-list label=${label}>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-link
      size="m"
      href="https://www.sbb.ch/en/"
      ${active ? 'class="sbb-active" aria-current="page"' : ''}
    >
      Label
    </sbb-navigation-link>
  </sbb-navigation-list>
`;

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [
        SbbSecondaryButton,
        SbbNavigationMarker,
        SbbNavigationSection,
        SbbNavigationList,
        SbbNavigationButton,
        SbbNavigationLink,
      ],
    }),
  ],
  title: 'elements/sbb-navigation/sbb-navigation',
  component: SbbNavigation,
  parameters: {
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-secondary-button
          id="navigation-trigger"
          size="l"
          icon-name="hamburger-menu-small"
          aria-label="trigger navigation"
          aria-haspopup="true"
        ></sbb-secondary-button>
      <sbb-navigation id="navigation" trigger="navigation-trigger" ${spreadArgs(args)}>
        <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>
        <sbb-navigation-marker size="s">${navigationActionsS()}</sbb-navigation-marker>

        <sbb-navigation-section trigger="nav-1" title-content="Title one">
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
          <sbb-button size="m" style="width: fit-content"> All Tickets & Offers </sbb-button>
        </sbb-navigation-section>

        <sbb-navigation-section trigger="nav-2" title-content="Title two">
          ${navigationList('Label', true)} ${navigationList('Label')} ${navigationList('Label')}
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
        </sbb-navigation-section>

        <sbb-navigation-section trigger="nav-3" title-content="Title three">
          ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
          <sbb-secondary-button
            size="m"
            icon-name="circle-information-small"
            style="width: fit-content;"
          >
            Travel Information
          </sbb-secondary-button>
        </sbb-navigation-section>
      </sbb-navigation>
    `,
  }),
};
export default meta;

export const Default = {};
