import type { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';

import keywordsMap from './keywords.json' with { type: 'json' };

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
            keywords: keywordsMap.angular.guides.gettingStarted,
          },
          {
            label: 'How to update',
            link: './guides/how-to-update',
          },
          {
            label: 'Theming',
            link: './guides/theming',
            keywords: keywordsMap.angular.guides.theming,
          },
          {
            label: 'Layout',
            link: './guides/layout',
            keywords: keywordsMap.angular.guides.layout,
          },
          {
            label: 'Datetime',
            link: './guides/datetime',
            keywords: keywordsMap.angular.guides.datetime,
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
            keywords: keywordsMap.angular.components.accordion,
          },
          {
            label: 'Action Group',
            link: './components/action-group',
            keywords: keywordsMap.angular.components.actionGroup,
          },
          {
            label: 'Alert',
            link: './components/alert',
            keywords: keywordsMap.angular.components.alert,
          },
          {
            label: 'Autocomplete',
            link: './components/autocomplete',
            keywords: keywordsMap.angular.components.autocomplete,
          },
          {
            label: 'Badge',
            link: './components/badge',
            keywords: keywordsMap.angular.components.badge,
          },
          {
            label: 'Breadcrumb',
            link: './components/breadcrumb',
            keywords: keywordsMap.angular.components.breadcrumb,
          },
          {
            label: 'Button',
            link: './components/button',
            keywords: keywordsMap.angular.components.button,
          },
          {
            label: 'Calendar',
            link: './components/calendar',
            keywords: keywordsMap.angular.components.calendar,
          },
          {
            label: 'Card',
            link: './components/card',
            keywords: keywordsMap.angular.components.card,
          },
          {
            label: 'Carousel',
            link: './components/carousel',
            keywords: keywordsMap.angular.components.carousel,
          },
          {
            label: 'Checkbox',
            link: './components/checkbox',
            keywords: keywordsMap.angular.components.checkbox,
          },
          {
            label: 'Checkbox Group',
            link: './components/checkbox-group',
            keywords: keywordsMap.angular.components.checkboxGroup,
          },
          {
            label: 'Checkbox Panel',
            link: './components/checkbox-panel',
            keywords: keywordsMap.angular.components.checkboxPanel,
          },
          {
            label: 'Chip',
            link: './components/chip',
            keywords: keywordsMap.angular.components.chip,
          },
          {
            label: 'Chip Label',
            link: './components/chip-label',
            keywords: keywordsMap.angular.components.chipLabel,
          },
          {
            label: 'Clock',
            link: './components/clock',
            keywords: keywordsMap.angular.components.clock,
          },
          {
            label: 'Container',
            link: './components/container',
            keywords: keywordsMap.angular.components.container,
          },
          {
            label: 'Date input',
            link: './components/date-input',
            keywords: keywordsMap.angular.components.dateInput,
          },
          {
            label: 'Datepicker',
            link: './components/datepicker',
            keywords: keywordsMap.angular.components.datepicker,
          },
          {
            label: 'Dialog',
            link: './components/dialog',
            keywords: keywordsMap.angular.components.dialog,
          },
          {
            label: 'Divider',
            link: './components/divider',
            keywords: keywordsMap.angular.components.divider,
          },
          {
            label: 'Download',
            link: './components/download',
            keywords: keywordsMap.angular.components.download,
          },
          {
            label: 'Expansion Panel',
            link: './components/expansion-panel',
            keywords: keywordsMap.angular.components.expansionPanel,
          },
          {
            label: 'File Selector',
            link: './components/file-selector',
            keywords: keywordsMap.angular.components.fileSelector,
          },
          {
            label: 'Flip Card',
            link: './components/flip-card',
            keywords: keywordsMap.angular.components.flipCard,
          },
          {
            label: 'Footer',
            link: './components/footer',
            keywords: keywordsMap.angular.components.footer,
          },
          {
            label: 'Form Field',
            link: './components/form-field',
            keywords: keywordsMap.angular.components.formField,
          },
          {
            label: 'Header',
            link: './components/header',
            keywords: keywordsMap.angular.components.header,
          },
          {
            label: 'Icon',
            link: './components/icon',
            keywords: keywordsMap.angular.components.icon,
          },
          {
            label: 'Icon Sidebar',
            link: './components/icon-sidebar',
            keywords: keywordsMap.angular.components.iconSidebar,
          },
          {
            label: 'Image',
            link: './components/image',
            keywords: keywordsMap.angular.components.image,
          },
          {
            label: 'Journey Header',
            link: './components/journey-header',
            keywords: keywordsMap.angular.components.journeyHeader,
          },
          {
            label: 'Lead Container',
            link: './components/lead-container',
            keywords: keywordsMap.angular.components.leadContainer,
          },
          {
            label: 'Link',
            link: './components/link',
            keywords: keywordsMap.angular.components.link,
          },
          {
            label: 'Link List',
            link: './components/link-list',
            keywords: keywordsMap.angular.components.linkList,
          },
          {
            label: 'Link List Anchor',
            link: './components/link-list-anchor',
            keywords: keywordsMap.angular.components.linkListAnchor,
          },
          {
            label: 'Loading Indicator',
            link: './components/loading-indicator',
            keywords: keywordsMap.angular.components.loadingIndicator,
          },
          {
            label: 'Loading Indicator Circle',
            link: './components/loading-indicator-circle',
            keywords: keywordsMap.angular.components.loadingIndicatorCircle,
          },
          {
            label: 'Logo',
            link: './components/logo',
            keywords: keywordsMap.angular.components.logo,
          },
          {
            label: 'Map Container',
            link: './components/map-container',
            keywords: keywordsMap.angular.components.mapContainer,
          },
          {
            label: 'Menu',
            link: './components/menu',
            keywords: keywordsMap.angular.components.menu,
          },
          {
            label: 'Message',
            link: './components/message',
            keywords: keywordsMap.angular.components.message,
          },
          {
            label: 'Mini Calendar',
            link: './components/mini-calendar',
            keywords: keywordsMap.angular.components.miniCalendar,
          },
          {
            label: 'Navigation',
            link: './components/navigation',
            keywords: keywordsMap.angular.components.navigation,
          },
          {
            label: 'Notification',
            link: './components/notification',
            keywords: keywordsMap.angular.components.notification,
          },
          {
            label: 'Option',
            link: './components/option',
            keywords: keywordsMap.angular.components.option,
          },
          {
            label: 'Overlay',
            link: './components/overlay',
            keywords: keywordsMap.angular.components.overlay,
          },
          {
            label: 'Paginator',
            link: './components/paginator',
            keywords: keywordsMap.angular.components.paginator,
          },
          {
            label: 'Popover',
            link: './components/popover',
            keywords: keywordsMap.angular.components.popover,
          },
          {
            label: 'Radio Button',
            link: './components/radio-button',
            keywords: keywordsMap.angular.components.radioButton,
          },
          {
            label: 'Radio Button Group',
            link: './components/radio-button-group',
            keywords: keywordsMap.angular.components.radioButtonGroup,
          },
          {
            label: 'Radio Button Panel',
            link: './components/radio-button-panel',
            keywords: keywordsMap.angular.components.radioButtonPanel,
          },
          {
            label: 'Select',
            link: './components/select',
            keywords: keywordsMap.angular.components.select,
          },
          {
            label: 'Selection Action Panel',
            link: './components/selection-action-panel',
            keywords: keywordsMap.angular.components.selectionActionPanel,
          },
          {
            label: 'Selection Expansion Panel',
            link: './components/selection-expansion-panel',
            keywords: keywordsMap.angular.components.selectionExpansionPanel,
          },
          {
            label: 'Sidebar',
            link: './components/sidebar',
            keywords: keywordsMap.angular.components.sidebar,
          },
          {
            label: 'Signet',
            link: './components/signet',
            keywords: keywordsMap.angular.components.signet,
          },
          {
            label: 'Skiplink List',
            link: './components/skiplink-list',
            keywords: keywordsMap.angular.components.skiplinkList,
          },
          {
            label: 'Slider',
            link: './components/slider',
            keywords: keywordsMap.angular.components.slider,
          },
          {
            label: 'Status',
            link: './components/status',
            keywords: keywordsMap.angular.components.status,
          },
          {
            label: 'Stepper',
            link: './components/stepper',
            keywords: keywordsMap.angular.components.stepper,
          },
          {
            label: 'Table',
            link: './components/table',
            keywords: keywordsMap.angular.components.table,
          },
          {
            label: 'Tabs',
            link: './components/tabs',
            keywords: keywordsMap.angular.components.tabs,
          },
          {
            label: 'Tag',
            link: './components/tag',
            keywords: keywordsMap.angular.components.tag,
          },
          {
            label: 'Teaser',
            link: './components/teaser',
            keywords: keywordsMap.angular.components.teaser,
          },
          {
            label: 'Teaser Hero',
            link: './components/teaser-hero',
            keywords: keywordsMap.angular.components.teaserHero,
          },
          {
            label: 'Teaser Panel',
            link: './components/teaser-panel',
            keywords: keywordsMap.angular.components.teaserPanel,
          },
          {
            label: 'Teaser Product',
            link: './components/teaser-product',
            keywords: keywordsMap.angular.components.teaserProduct,
          },
          {
            label: 'Time Input',
            link: './components/time-input',
            keywords: keywordsMap.angular.components.timeInput,
          },
          {
            label: 'Timetable Form',
            link: './components/timetable-form',
            keywords: keywordsMap.angular.components.timetableForm,
          },
          {
            label: 'Timetable Occupancy',
            link: './components/timetable-occupancy',
            keywords: keywordsMap.angular.components.timetableOccupancy,
          },
          {
            label: 'Timetable Occupancy Icon',
            link: './components/timetable-occupancy-icon',
            keywords: keywordsMap.angular.components.timetableOccupancyIcon,
          },
          {
            label: 'Title',
            link: './components/title',
            keywords: keywordsMap.angular.components.title,
          },
          {
            label: 'Toast',
            link: './components/toast',
            keywords: keywordsMap.angular.components.toast,
          },
          {
            label: 'Toggle',
            link: './components/toggle',
            keywords: keywordsMap.angular.components.toggle,
          },
          {
            label: 'Toggle Check',
            link: './components/toggle-check',
            keywords: keywordsMap.angular.components.toggleCheck,
          },
          {
            label: 'Tooltip',
            link: './components/tooltip',
            keywords: keywordsMap.angular.components.tooltip,
          },
          {
            label: 'Train',
            link: './components/train',
            keywords: keywordsMap.angular.components.train,
          },
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
            keywords: keywordsMap.angularExperimental.guides.gettingStarted,
          },
        ],
      },
      {
        name: 'Components',
        entries: [
          {
            label: 'Autocomplete Grid',
            link: './components/autocomplete-grid',
            keywords: keywordsMap.angularExperimental.components.autocompleteGrid,
          },
          {
            label: 'Journey Summary',
            link: './components/journey-summary',
            keywords: keywordsMap.angularExperimental.components.journeySummary,
          },
          {
            label: 'Pearl Chain',
            link: './components/pearl-chain',
            keywords: keywordsMap.angularExperimental.components.pearlChain,
          },
          {
            label: 'Pearl Chain Time',
            link: './components/pearl-chain-time',
            keywords: keywordsMap.angularExperimental.components.pearlChainTime,
          },
          {
            label: 'Pearl Chain Vertical',
            link: './components/pearl-chain-vertical',
            keywords: keywordsMap.angularExperimental.components.pearlChainVertical,
          },
          {
            label: 'Pearl Chain Vertical Item',
            link: './components/pearl-chain-vertical-item',
            keywords: keywordsMap.angularExperimental.components.pearlChainVerticalItem,
          },
          {
            label: 'Seat Reservation',
            link: './components/seat-reservation',
            keywords: keywordsMap.angularExperimental.components.seatReservation,
          },
          {
            label: 'Timetable Duration',
            link: './components/timetable-duration',
            keywords: keywordsMap.angularExperimental.components.timetableDuration,
          },
          {
            label: 'Timetable Row',
            link: './components/timetable-row',
            keywords: keywordsMap.angularExperimental.components.timetableRow,
          },
        ],
      },
    ],
  },
};
