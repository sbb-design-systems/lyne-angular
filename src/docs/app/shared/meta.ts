export interface ShowcaseMetaPackage {
  name: string;
  svgIcon: string;
  image: string;
  description: string;
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
  variantOnly?: 'standard' | 'lean';
}

export const PACKAGES: Record<string, ShowcaseMetaPackage> = {
  angular: {
    name: '@sbb-esta/angular',
    svgIcon: 'browser-small',
    image: 'assets/websites.jpg',
    description: 'Components which can be used for websites and webapps.',
    sections: [
      {
        name: 'Introduction',
        entries: [
          { label: 'Getting started', link: './introduction/getting-started' },
          { label: 'Typography', link: './introduction/typography' },
        ],
      },
      {
        name: 'Guides',
        entries: [{ label: 'TBD', link: './tbd' }],
      },
      {
        name: 'Components',
        entries: [
          { label: 'Accordion', link: './components/accordion' },
          { label: 'Action Group', link: './components/action-group' },
          { label: 'Alert', link: './components/alert' },
          { label: 'Autocomplete', link: './components/autocomplete' },
          { label: 'Autocomplete Grid', link: './components/autocomplete-grid' },
          { label: 'Breadcrumb', link: './components/breadcrumb' },
          { label: 'Button', link: './components/button' },
          { label: 'Calendar', link: './components/calendar' },
          { label: 'Card', link: './components/card' },
          { label: 'Carousel', link: './components/carousel' },
          { label: 'Checkbox', link: './components/checkbox' },
          { label: 'Chip', link: './components/chip' },
          { label: 'Chip Label', link: './components/chip-label' },
          { label: 'Clock', link: './components/clock' },
          { label: 'Container', link: './components/container' },
          { label: 'Date input', link: './components/date-input' },
          { label: 'Datepicker', link: './components/datepicker' },
          { label: 'Dialog', link: './components/dialog' },
          { label: 'Divider', link: './components/divider' },
          { label: 'File Selector', link: './components/file-selector' },
          { label: 'Flip Card', link: './components/flip-card' },
          { label: 'Footer', link: './components/footer' },
          { label: 'Form Field', link: './components/form-field' },
          { label: 'Header', link: './components/header' },
          { label: 'Icon', link: './components/icon' },
          { label: 'Image', link: './components/image' },
          { label: 'Journey Header', link: './components/journey-header' },
          { label: 'Lead Container', link: './components/lead-container' },
          { label: 'Link', link: './components/link' },
          { label: 'Link List', link: './components/link-list' },
          { label: 'Loading Indicator', link: './components/loading-indicator' },
          { label: 'Loading Indicator Circle', link: './components/loading-indicator-circle' },
          { label: 'Logo', link: './components/logo' },
          { label: 'Map Container', link: './components/map-container' },
          { label: 'Menu', link: './components/menu' },
          { label: 'Message', link: './components/message' },
          { label: 'Mini Calendar', link: './components/mini-calendar' },
          { label: 'Navigation', link: './components/navigation' },
          { label: 'Notification', link: './components/notification' },
          { label: 'Option', link: './components/option' },
          { label: 'Overlay', link: './components/overlay' },
          { label: 'Paginator', link: './components/paginator' },
          { label: 'Popover', link: './components/popover' },
          { label: 'Radio Button', link: './components/radio-button' },
          { label: 'Screen Readed Only', link: './components/screen-reader-only' },
          { label: 'Select', link: './components/select' },
          { label: 'Selection Action Panel', link: './components/selection-action-panel' },
          { label: 'Selection Expansion Panel', link: './components/selection-expansion-panel' },
          { label: 'Sidebar', link: './components/sidebar' },
          { label: 'Signet', link: './components/signet' },
          { label: 'Skiplink List', link: './components/skiplink-list' },
          { label: 'Slider', link: './components/slider' },
          { label: 'Status', link: './components/status' },
          { label: 'Stepper', link: './components/stepper' },
          { label: 'Tab', link: './components/tab' },
          { label: 'Table', link: './components/table' },
          { label: 'Tag', link: './components/tag' },
          { label: 'Teaser', link: './components/teaser' },
          { label: 'Time Input', link: './components/time-input' },
          { label: 'Timetable', link: './components/timetable' },
          { label: 'Timetable Form', link: './components/timetable-form' },
          { label: 'Title', link: './components/title' },
          { label: 'Toast', link: './components/toast' },
          { label: 'Toggle', link: './components/toggle' },
          { label: 'Tooltip', link: './components/tooltip' },
          { label: 'Visual Checkbox', link: './components/visual-checkbox' },
        ],
      },
    ],
  },
  'angular-experimental': {
    name: '@sbb-esta/angular-experimental',
    svgIcon: 'cloud-lightning-small',
    image: 'assets/websites.jpg',
    description: 'Experimental components which can be used for websites and webapps.',
    sections: [
      {
        name: 'Introduction',
        entries: [{ label: 'Getting started', link: './introduction/getting-started' }],
      },
      {
        name: 'Components',
        entries: [
          { label: 'Journey Summary', link: './components/journey-summary' },
          { label: 'Pearl Chain', link: './components/pearl-chain' },
          { label: 'Pearl Chain Time', link: './components/pearl-chain-time' },
          { label: 'Pearl Chain Vertical', link: './components/pearl-chain-vertical' },
          { label: 'Pearl Chain Vertical Item', link: './components/pearl-chain-vertical-item' },
          { label: 'Seat Reservation', link: './components/seat-reservation' },
          { label: 'Timetable Duration', link: './components/timetable-duration' },
          { label: 'Timetable Row', link: './components/timetable-row' },
        ],
      },
    ],
  },
};

export function findPackageEntry(packageName: string, componentId: string): ShowcaseMetaEntry {
  for (const section of PACKAGES[packageName].sections) {
    const foundEntry = section.entries.find((entry) => entry.link.endsWith(componentId));
    if (foundEntry) {
      return foundEntry;
    }
  }

  return null!;
}
