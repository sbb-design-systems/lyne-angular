import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbAlert } from '@sbb-esta/lyne-angular/alert/alert';
import { SbbAlertGroup } from '@sbb-esta/lyne-angular/alert/alert-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbButtonLink } from '@sbb-esta/lyne-angular/button/button-link';
import { SbbSecondaryButtonLink } from '@sbb-esta/lyne-angular/button/secondary-button-link';
import { SbbSecondaryButtonStatic } from '@sbb-esta/lyne-angular/button/secondary-button-static';
import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbCardLink } from '@sbb-esta/lyne-angular/card/card-link';
import { SbbClock } from '@sbb-esta/lyne-angular/clock';
import { SbbDialog } from '@sbb-esta/lyne-angular/dialog/dialog';
import { SbbDialogActions } from '@sbb-esta/lyne-angular/dialog/dialog-actions';
import { SbbDialogContent } from '@sbb-esta/lyne-angular/dialog/dialog-content';
import { SbbDialogTitle } from '@sbb-esta/lyne-angular/dialog/dialog-title';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbFooter } from '@sbb-esta/lyne-angular/footer';
import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbJourneyHeader } from '@sbb-esta/lyne-angular/journey-header';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbLinkList } from '@sbb-esta/lyne-angular/link-list/link-list';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbMenuLink } from '@sbb-esta/lyne-angular/menu/menu-link';
import { SbbNavigation } from '@sbb-esta/lyne-angular/navigation/navigation';
import { SbbNavigationButton } from '@sbb-esta/lyne-angular/navigation/navigation-button';
import { SbbNavigationLink } from '@sbb-esta/lyne-angular/navigation/navigation-link';
import { SbbNavigationList } from '@sbb-esta/lyne-angular/navigation/navigation-list';
import { SbbNavigationMarker } from '@sbb-esta/lyne-angular/navigation/navigation-marker';
import { SbbNavigationSection } from '@sbb-esta/lyne-angular/navigation/navigation-section';
import { SbbSkiplinkList } from '@sbb-esta/lyne-angular/skiplink-list';
import { SbbTeaserHero } from '@sbb-esta/lyne-angular/teaser-hero';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { SbbPearlChain } from '@sbb-esta/lyne-angular-experimental/pearl-chain';
import type { SbbDialogElement } from '@sbb-esta/lyne-elements/dialog/dialog.js';
import type { Args, Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { futureLeg, pastLeg } from '../../../helpers/pearl-chain.sample-data';

import { homeTemplate } from './home';
import { homeLoggedInTemplate } from './home-logged-in';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  negative,
  expanded,
};

const args: Args = {
  negative: false,
  expanded: false,
};

export const home: StoryObj = {
  render: (args: Args) => ({
    props: { ...args },
    template: homeTemplate(args),
  }),
};

export const homeLoggedIn = {
  argTypes: {
    ...argTypes,
    legs: { control: false },
    openDialog: { type: 'function', control: false },
    openStackedDialog: { type: 'function', control: false },
  },
  args: {
    ...args,
    legs: [pastLeg, futureLeg],
    openDialog: () => {
      (document.getElementById('my-dialog') as SbbDialogElement).open();
    },
    openStackedDialog: () => {
      (document.getElementById('my-stacked-dialog') as SbbDialogElement).open();
    },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: homeLoggedInTemplate(args),
  }),
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbAlert,
        SbbAlertGroup,
        SbbActionGroup,
        SbbButton,
        SbbButtonLink,
        SbbBlockLink,
        SbbSecondaryButtonLink,
        SbbSecondaryButtonStatic,
        SbbCard,
        SbbCardBadge,
        SbbCardLink,
        SbbClock,
        SbbDivider,
        SbbDialog,
        SbbDialogTitle,
        SbbDialogActions,
        SbbDialogContent,
        SbbFooter,
        SbbIcon,
        SbbImage,
        SbbHeader,
        SbbHeaderButton,
        SbbHeaderLink,
        SbbJourneyHeader,
        SbbLogo,
        SbbLink,
        SbbLinkList,
        SbbMenu,
        SbbMenuButton,
        SbbMenuLink,
        SbbNavigation,
        SbbNavigationMarker,
        SbbNavigationButton,
        SbbNavigationLink,
        SbbNavigationSection,
        SbbNavigationList,
        SbbPearlChain,
        SbbSkiplinkList,
        SbbTitle,
        SbbTeaserHero,
      ],
    }),
  ],
  argTypes: argTypes,
  args: args,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
    layout: 'fullscreen',
  },
  title: 'pages/home',
};

export default meta;
