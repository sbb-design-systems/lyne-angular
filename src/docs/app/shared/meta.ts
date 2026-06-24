import type { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';

import guidesKeywordMap from './guide-keywords.json' with { type: 'json' };
import selectorMap from './selector-map.json' with { type: 'json' };

export interface ShowcaseMetaPackage {
  name: string;
  iconName: string;
  image: string;
  imageDark: string;
  description: string;
  label: string;
  labelColor: SbbChipLabel['color'];
  sections: ShowcaseMetaSection[];
  isDeprecated?: boolean;
}

export interface ShowcaseMetaSection {
  name: string;
  entries: ShowcaseMetaEntry[];
}

export interface ShowcaseMetaEntry {
  label: string;
  link: string;
  keywords?: string[];
}

export const PACKAGES: Record<string, ShowcaseMetaPackage> = {
  angular: {
    name: '@sbb-esta/lyne-angular',
    iconName: 'four-diamonds-small',
    image: 'assets/lyne.webp',
    imageDark: 'assets/lyne-dark.webp',
    description:
      'Standard components that can be used for any kind of web site and web application.',
    label: 'stable',
    labelColor: 'charcoal',
    sections: [
      {
        name: 'Guides',
        entries: [
          {
            label: 'Getting started',
            link: './guides/getting-started',
            keywords: guidesKeywordMap.angular.gettingStarted,
          },
          {
            label: 'How to update',
            link: './guides/how-to-update',
          },
          {
            label: 'Theming',
            link: './guides/theming',
            keywords: guidesKeywordMap.angular.theming,
          },
          {
            label: 'Layout',
            link: './guides/layout',
            keywords: guidesKeywordMap.angular.layout,
          },
          {
            label: 'Datetime',
            link: './guides/datetime',
            keywords: guidesKeywordMap.angular.datetime,
          },
          {
            label: 'Icon Overview',
            link: 'guides/icon-overview',
          },
        ],
      },
      {
        name: 'Components',
        entries: [
          {
            label: 'Accordion',
            link: './components/accordion',
            keywords: selectorMap.angular.accordion,
          },
          {
            label: 'Action Group',
            link: './components/action-group',
            keywords: selectorMap.angular.actionGroup,
          },
          { label: 'Alert', link: './components/alert', keywords: selectorMap.angular.alert },
          {
            label: 'Autocomplete',
            link: './components/autocomplete',
            keywords: selectorMap.angular.autocomplete,
          },
          { label: 'Badge', link: './components/badge', keywords: selectorMap.angular.badge },
          {
            label: 'Breadcrumb',
            link: './components/breadcrumb',
            keywords: selectorMap.angular.breadcrumb,
          },
          {
            label: 'Button',
            link: './components/button',
            keywords: selectorMap.angular.button,
          },
          {
            label: 'Calendar',
            link: './components/calendar',
            keywords: selectorMap.angular.calendar,
          },
          { label: 'Card', link: './components/card', keywords: selectorMap.angular.card },
          {
            label: 'Carousel',
            link: './components/carousel',
            keywords: selectorMap.angular.carousel,
          },
          {
            label: 'Checkbox',
            link: './components/checkbox',
            keywords: selectorMap.angular.checkbox,
          },
          {
            label: 'Checkbox Group',
            link: './components/checkbox-group',
            keywords: selectorMap.angular.checkboxGroup,
          },
          {
            label: 'Checkbox Panel',
            link: './components/checkbox-panel',
            keywords: selectorMap.angular.checkboxPanel,
          },
          { label: 'Chip', link: './components/chip', keywords: selectorMap.angular.chip },
          {
            label: 'Chip Label',
            link: './components/chip-label',
            keywords: selectorMap.angular.chipLabel,
          },
          { label: 'Clock', link: './components/clock', keywords: selectorMap.angular.clock },
          {
            label: 'Container',
            link: './components/container',
            keywords: selectorMap.angular.container,
          },
          {
            label: 'Date input',
            link: './components/date-input',
            keywords: selectorMap.angular.dateInput,
          },
          {
            label: 'Datepicker',
            link: './components/datepicker',
            keywords: selectorMap.angular.datepicker,
          },
          {
            label: 'Dialog',
            link: './components/dialog',
            keywords: selectorMap.angular.dialog,
          },
          {
            label: 'Divider',
            link: './components/divider',
            keywords: selectorMap.angular.divider,
          },
          {
            label: 'Expansion Panel',
            link: './components/expansion-panel',
            keywords: selectorMap.angular.expansionPanel,
          },
          {
            label: 'File Selector',
            link: './components/file-selector',
            keywords: selectorMap.angular.fileSelector,
          },
          {
            label: 'Flip Card',
            link: './components/flip-card',
            keywords: selectorMap.angular.flipCard,
          },
          {
            label: 'Footer',
            link: './components/footer',
            keywords: selectorMap.angular.footer,
          },
          {
            label: 'Form Field',
            link: './components/form-field',
            keywords: selectorMap.angular.formField,
          },
          {
            label: 'Header',
            link: './components/header',
            keywords: selectorMap.angular.header,
          },
          { label: 'Icon', link: './components/icon', keywords: selectorMap.angular.icon },
          {
            label: 'Icon Sidebar',
            link: './components/icon-sidebar',
            keywords: selectorMap.angular.iconSidebar,
          },
          { label: 'Image', link: './components/image', keywords: selectorMap.angular.image },
          {
            label: 'Journey Header',
            link: './components/journey-header',
            keywords: selectorMap.angular.journeyHeader,
          },
          {
            label: 'Lead Container',
            link: './components/lead-container',
            keywords: selectorMap.angular.leadContainer,
          },
          { label: 'Link', link: './components/link', keywords: selectorMap.angular.link },
          {
            label: 'Link List',
            link: './components/link-list',
            keywords: selectorMap.angular.linkList,
          },
          {
            label: 'Link List Anchor',
            link: './components/link-list-anchor',
            keywords: selectorMap.angular.linkListAnchor,
          },
          {
            label: 'Loading Indicator',
            link: './components/loading-indicator',
            keywords: selectorMap.angular.loadingIndicator,
          },
          {
            label: 'Loading Indicator Circle',
            link: './components/loading-indicator-circle',
            keywords: selectorMap.angular.loadingIndicatorCircle,
          },
          { label: 'Logo', link: './components/logo', keywords: selectorMap.angular.logo },
          {
            label: 'Map Container',
            link: './components/map-container',
            keywords: selectorMap.angular.mapContainer,
          },
          { label: 'Menu', link: './components/menu', keywords: selectorMap.angular.menu },
          {
            label: 'Message',
            link: './components/message',
            keywords: selectorMap.angular.message,
          },
          {
            label: 'Mini Calendar',
            link: './components/mini-calendar',
            keywords: selectorMap.angular.miniCalendar,
          },
          {
            label: 'Navigation',
            link: './components/navigation',
            keywords: selectorMap.angular.navigation,
          },
          {
            label: 'Notification',
            link: './components/notification',
            keywords: selectorMap.angular.notification,
          },
          {
            label: 'Option',
            link: './components/option',
            keywords: selectorMap.angular.option,
          },
          {
            label: 'Overlay',
            link: './components/overlay',
            keywords: selectorMap.angular.overlay,
          },
          {
            label: 'Paginator',
            link: './components/paginator',
            keywords: selectorMap.angular.paginator,
          },
          {
            label: 'Popover',
            link: './components/popover',
            keywords: selectorMap.angular.popover,
          },
          {
            label: 'Radio Button',
            link: './components/radio-button',
            keywords: selectorMap.angular.radioButton,
          },
          {
            label: 'Radio Button Group',
            link: './components/radio-button-group',
            keywords: selectorMap.angular.radioButtonGroup,
          },
          {
            label: 'Radio Button Panel',
            link: './components/radio-button-panel',
            keywords: selectorMap.angular.radioButtonPanel,
          },
          {
            label: 'Select',
            link: './components/select',
            keywords: selectorMap.angular.select,
          },
          {
            label: 'Selection Action Panel',
            link: './components/selection-action-panel',
            keywords: selectorMap.angular.selectionActionPanel,
          },
          {
            label: 'Selection Expansion Panel',
            link: './components/selection-expansion-panel',
            keywords: selectorMap.angular.selectionExpansionPanel,
          },
          {
            label: 'Sidebar',
            link: './components/sidebar',
            keywords: selectorMap.angular.sidebar,
          },
          {
            label: 'Signet',
            link: './components/signet',
            keywords: selectorMap.angular.signet,
          },
          {
            label: 'Skiplink List',
            link: './components/skiplink-list',
            keywords: selectorMap.angular.skiplinkList,
          },
          {
            label: 'Slider',
            link: './components/slider',
            keywords: selectorMap.angular.slider,
          },
          {
            label: 'Status',
            link: './components/status',
            keywords: selectorMap.angular.status,
          },
          {
            label: 'Stepper',
            link: './components/stepper',
            keywords: selectorMap.angular.stepper,
          },
          { label: 'Table', link: './components/table', keywords: selectorMap.angular.table },
          { label: 'Tabs', link: './components/tabs', keywords: selectorMap.angular.tabs },
          { label: 'Tag', link: './components/tag', keywords: selectorMap.angular.tag },
          {
            label: 'Teaser',
            link: './components/teaser',
            keywords: selectorMap.angular.teaser,
          },
          {
            label: 'Teaser Hero',
            link: './components/teaser-hero',
            keywords: selectorMap.angular.teaserHero,
          },
          {
            label: 'Teaser Panel',
            link: './components/teaser-panel',
            keywords: selectorMap.angular.teaserPanel,
          },
          {
            label: 'Teaser Product',
            link: './components/teaser-product',
            keywords: selectorMap.angular.teaserProduct,
          },
          {
            label: 'Time Input',
            link: './components/time-input',
            keywords: selectorMap.angular.timeInput,
          },
          {
            label: 'Timetable Form',
            link: './components/timetable-form',
            keywords: selectorMap.angular.timetableForm,
          },
          {
            label: 'Timetable Occupancy',
            link: './components/timetable-occupancy',
            keywords: selectorMap.angular.timetableOccupancy,
          },
          {
            label: 'Timetable Occupancy Icon',
            link: './components/timetable-occupancy-icon',
            keywords: selectorMap.angular.timetableOccupancyIcon,
          },
          { label: 'Title', link: './components/title', keywords: selectorMap.angular.title },
          { label: 'Toast', link: './components/toast', keywords: selectorMap.angular.toast },
          {
            label: 'Toggle',
            link: './components/toggle',
            keywords: selectorMap.angular.toggle,
          },
          {
            label: 'Toggle Check',
            link: './components/toggle-check',
            keywords: selectorMap.angular.toggleCheck,
          },
          {
            label: 'Tooltip',
            link: './components/tooltip',
            keywords: selectorMap.angular.tooltip,
          },
          { label: 'Train', link: './components/train', keywords: selectorMap.angular.train },
        ],
      },
    ],
  },
  'angular-experimental': {
    name: '@sbb-esta/lyne-angular-experimental',
    iconName: 'flask-test-tube-small',
    image: 'assets/lyne.webp',
    imageDark: 'assets/lyne-dark.webp',
    description: 'Experimental components that can change at any time.',
    label: 'experimental',
    labelColor: 'granite',
    sections: [
      {
        name: 'Guides',
        entries: [
          {
            label: 'Getting started',
            link: './guides/getting-started',
            keywords: guidesKeywordMap.angularExperimental.gettingStarted,
          },
        ],
      },
      {
        name: 'Components',
        entries: [
          {
            label: 'Autocomplete Grid',
            link: './components/autocomplete-grid',
            keywords: selectorMap.angularExperimental.autocompleteGrid,
          },
          {
            label: 'Journey Summary',
            link: './components/journey-summary',
            keywords: selectorMap.angularExperimental.journeySummary,
          },
          {
            label: 'Pearl Chain',
            link: './components/pearl-chain',
            keywords: selectorMap.angularExperimental.pearlChain,
          },
          {
            label: 'Pearl Chain Time',
            link: './components/pearl-chain-time',
            keywords: selectorMap.angularExperimental.pearlChainTime,
          },
          {
            label: 'Pearl Chain Vertical',
            link: './components/pearl-chain-vertical',
            keywords: selectorMap.angularExperimental.pearlChainVertical,
          },
          {
            label: 'Pearl Chain Vertical Item',
            link: './components/pearl-chain-vertical-item',
            keywords: selectorMap.angularExperimental.pearlChainVerticalItem,
          },
          {
            label: 'Seat Reservation',
            link: './components/seat-reservation',
            keywords: selectorMap.angularExperimental.seatReservation,
          },
          {
            label: 'Timetable Duration',
            link: './components/timetable-duration',
            keywords: selectorMap.angularExperimental.timetableDuration,
          },
          {
            label: 'Timetable Row',
            link: './components/timetable-row',
            keywords: selectorMap.angularExperimental.timetableRow,
          },
        ],
      },
    ],
  },
};
