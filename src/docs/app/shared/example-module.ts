import type { Type } from '@angular/core';

import type { ExampleData } from './example-data';

export const EXAMPLE_COMPONENTS: Record<string, (string | Partial<ExampleData>)[]> = {
  accordion: [
    'accordion-showcase',
    'accordion-basic',
    'accordion-nested-lazy',
    { id: 'accordion-wizard', hasStyle: true },
  ],
  'action-group': ['action-group-basic', { id: 'action-group-complex', hasStyle: true }],
  alert: ['alert-showcase', 'alert-basic', 'alert-group'],
  autocomplete: [
    'autocomplete-showcase',
    'autocomplete-basic',
    'autocomplete-hint-optgroup',
    'autocomplete-complex-value',
  ],
  badge: ['badge-basic', 'badge-before', 'badge-header-button'],
  breadcrumb: ['breadcrumb-basic'],
  button: [
    'button-showcase',
    'button-link-basic',
    'button-static-basic',
    'mini-button-showcase',
    'mini-button-group',
  ],
  calendar: [
    'calendar-showcase',
    'calendar-reactive-form',
    'calendar-with-filter',
    { id: 'calendar-enhanced', hasStyle: true },
    'calendar-fixed-month',
  ],
  card: ['card-basic', 'card-link', 'card-button'],
  carousel: [
    { id: 'carousel-basic', hasStyle: true },
    'carousel-link',
    { id: 'carousel-button', hasStyle: true },
  ],
  checkbox: [
    'checkbox-showcase',
    'checkbox-signal',
    'checkbox-reactive',
    'checkbox-template-driven',
  ],
  'checkbox-group': [
    'checkbox-group-showcase',
    { id: 'checkbox-group-panel-showcase', hasStyle: true },
    'checkbox-group-with-error',
  ],
  'checkbox-panel': [
    { id: 'checkbox-panel-showcase', hasStyle: true },
    { id: 'checkbox-panel-reactive', hasStyle: true },
    { id: 'checkbox-panel-template-driven', hasStyle: true },
  ],
  chip: ['chip-showcase', 'chip-basic', 'chip-autocomplete', 'chip-complex-value'],
  'chip-label': ['chip-label-showcase'],
  clock: ['clock-basic', 'clock-paused'],
  container: [
    { id: 'container-showcase', hasStyle: true },
    { id: 'container-background-image', hasStyle: true },
    { id: 'container-sticky-bar', hasStyle: true },
    { id: 'container-sticky-bar-control-sticky-state', hasStyle: true },
  ],
  'date-input': [
    'date-input-showcase',
    'date-input-signal',
    'date-input-reactive',
    'date-input-template-driven',
  ],
  datepicker: ['datepicker-showcase', 'datepicker-basic'],
  dialog: ['dialog-showcase', 'dialog-service'],
  divider: [{ id: 'divider-basic', hasStyle: true }],
  download: ['download-showcase', 'download-custom-content'],
  'expansion-panel': ['expansion-panel-showcase', 'expansion-panel-basic'],
  'file-selector': [
    'file-selector-showcase',
    'file-selector-dropzone-showcase',
    'file-selector-signal',
    'file-selector-reactive-form',
    'file-selector-template-driven',
  ],
  'flip-card': ['flip-card-showcase', 'flip-card-basic', 'flip-card-chip'],
  footer: ['footer-basic', 'footer-clock'],
  'form-field': [
    'form-field-showcase',
    'form-field-native-select',
    'form-field-clear',
    'form-field-hint',
    'form-field-text-counter',
    'form-field-prefix-suffix',
  ],
  header: ['header-showcase', 'header-environment', { id: 'header-scroll-origin', hasStyle: true }],
  icon: ['icon-basic'],
  'icon-sidebar': [{ id: 'icon-sidebar-showcase', hasStyle: true }, 'icon-sidebar-nested'],
  image: ['image-basic', 'image-with-chip', 'image-round'],
  'journey-header': ['journey-header-showcase'],
  'lead-container': ['lead-container-basic'],
  link: ['link-showcase', 'block-link-showcase'],
  'link-list': ['link-list-showcase'],
  'link-list-anchor': ['link-list-anchor-showcase'],
  'loading-indicator': ['loading-indicator-showcase'],
  'loading-indicator-circle': ['loading-indicator-circle-showcase'],
  logo: [{ id: 'logo-showcase', hasStyle: true }],
  'map-container': ['map-container-basic'],
  menu: ['menu-basic', { id: 'menu-custom-content', hasStyle: true }, 'menu-nested'],
  message: [{ id: 'message-basic', hasStyle: true }],
  'mini-calendar': ['mini-calendar-basic'],
  navigation: ['navigation-basic', 'navigation-section'],
  notification: ['notification-showcase'],
  option: ['option-showcase'],
  overlay: ['overlay-showcase', 'overlay-service', 'overlay-nested'],
  paginator: ['paginator-showcase', 'paginator-compact'],
  popover: [{ id: 'popover-showcase', hasStyle: true }],
  'radio-button': ['radio-button-showcase'],
  'radio-button-group': [
    'radio-button-group-showcase',
    'radio-button-group-signal',
    'radio-button-group-reactive',
    'radio-button-group-template-driven',
  ],
  'radio-button-panel': [
    { id: 'radio-button-panel-showcase', hasStyle: true },
    { id: 'radio-button-panel-signal', hasStyle: true },
    { id: 'radio-button-panel-reactive', hasStyle: true },
    { id: 'radio-button-panel-template-driven', hasStyle: true },
  ],
  'seat-reservation': [
    'seat-reservation-basic',
    'seat-reservation-multiple-decks',
    'seat-reservation-bus',
  ],
  select: [
    'select-showcase',
    'select-optgroup',
    'select-complex-value',
    'select-signal',
    'select-reactive',
    'select-template-driven',
  ],
  'selection-action-panel': [
    'selection-action-panel-basic',
    'selection-action-panel-with-expansion',
    'selection-action-panel-group',
  ],
  'selection-expansion-panel': ['selection-expansion-panel-basic'],
  sidebar: [{ id: 'sidebar-showcase', hasStyle: true }, 'sidebar-nested'],
  signet: [{ id: 'signet-showcase', hasStyle: true }],
  'skiplink-list': ['skiplink-list-basic'],
  slider: ['slider-basic'],
  status: ['status-showcase'],
  stepper: ['stepper-basic'],
  table: [
    'simple-table',
    { id: 'sticky-table', hasStyle: true },
    'grouped-columns-table',
    'grouped-rows-and-columns-table',
    'sortable-table',
    { id: 'paginator-table', hasStyle: true },
    'selectable-table',
    { id: 'filter-sort-paginator-table', hasStyle: true },
    { id: 'native-table', hasStyle: true },
    { id: 'expandable-table', hasStyle: true },
  ],
  tabs: [
    'tabs-showcase',
    { id: 'tabs-fixed-height', hasStyle: true },
    'tabs-tab-nav-bar',
    'tabs-lazy-content',
  ],
  tag: ['tag-basic'],
  teaser: ['teaser-basic'],
  'teaser-hero': ['teaser-hero-basic'],
  'teaser-panel': ['teaser-panel-basic'],
  'teaser-product': ['teaser-product-basic'],
  'time-input': ['time-input-basic'],
  'timetable-form': ['timetable-form-basic'],
  'timetable-occupancy': ['timetable-occupancy-showcase'],
  'timetable-occupancy-icon': ['timetable-occupancy-icon-showcase'],
  title: ['title-basic'],
  toast: ['toast-basic'],
  toggle: ['toggle-basic'],
  'toggle-check': ['toggle-check-basic'],
  tooltip: ['tooltip-basic'],
  train: ['train-basic', 'train-vertical'],
};

export async function loadExample(id: string): Promise<Record<string, Type<unknown>> | undefined> {
  switch (id) {
    case 'accordion-basic':
    case 'accordion-nested-lazy':
    case 'accordion-showcase':
    case 'accordion-wizard':
      return import('../angular/examples/accordion');
    case 'action-group-basic':
    case 'action-group-complex':
      return import('../angular/examples/action-group');
    case 'alert-basic':
    case 'alert-group':
    case 'alert-showcase':
      return import('../angular/examples/alert');
    case 'autocomplete-basic':
    case 'autocomplete-complex-value':
    case 'autocomplete-hint-optgroup':
    case 'autocomplete-showcase':
      return import('../angular/examples/autocomplete');
    case 'badge-basic':
    case 'badge-before':
    case 'badge-header-button':
      return import('../angular/examples/badge');
    case 'block-link-showcase':
      return import('../angular/examples/link');
    case 'breadcrumb-basic':
      return import('../angular/examples/breadcrumb');
    case 'button-link-basic':
    case 'button-showcase':
    case 'button-static-basic':
      return import('../angular/examples/button');
    case 'calendar-enhanced':
    case 'calendar-fixed-month':
    case 'calendar-reactive-form':
    case 'calendar-showcase':
    case 'calendar-with-filter':
      return import('../angular/examples/calendar');
    case 'card-basic':
    case 'card-button':
    case 'card-link':
      return import('../angular/examples/card');
    case 'carousel-basic':
    case 'carousel-button':
    case 'carousel-link':
      return import('../angular/examples/carousel');
    case 'checkbox-group-panel-showcase':
    case 'checkbox-group-showcase':
    case 'checkbox-group-with-error':
      return import('../angular/examples/checkbox-group');
    case 'checkbox-panel-reactive':
    case 'checkbox-panel-showcase':
    case 'checkbox-panel-template-driven':
      return import('../angular/examples/checkbox-panel');
    case 'checkbox-reactive':
    case 'checkbox-showcase':
    case 'checkbox-signal':
    case 'checkbox-template-driven':
      return import('../angular/examples/checkbox');
    case 'chip-autocomplete':
    case 'chip-basic':
    case 'chip-complex-value':
      return import('../angular/examples/chip');
    case 'chip-label-showcase':
      return import('../angular/examples/chip-label');
    case 'chip-showcase':
      return import('../angular/examples/chip');
    case 'clock-basic':
    case 'clock-paused':
      return import('../angular/examples/clock');
    case 'container-background-image':
      return import('../angular/examples/container');
    case 'container-showcase':
      return import('../angular/examples/container');
    case 'container-sticky-bar':
      return import('../angular/examples/container');
    case 'container-sticky-bar-control-sticky-state':
      return import('../angular/examples/container');
    case 'date-input-reactive':
    case 'date-input-showcase':
      return import('../angular/examples/date-input');
    case 'date-input-signal':
    case 'date-input-template-driven':
      return import('../angular/examples/date-input');
    case 'datepicker-basic':
    case 'datepicker-showcase':
      return import('../angular/examples/datepicker');
    case 'dialog-service':
    case 'dialog-showcase':
      return import('../angular/examples/dialog');
    case 'divider-basic':
      return import('../angular/examples/divider');
    case 'download-custom-content':
    case 'download-showcase':
      return import('../angular/examples/download');
    case 'expandable-table':
      return import('../angular/examples/table');
    case 'expansion-panel-basic':
    case 'expansion-panel-showcase':
      return import('../angular/examples/expansion-panel');
    case 'file-selector-dropzone-showcase':
    case 'file-selector-reactive-form':
    case 'file-selector-showcase':
    case 'file-selector-signal':
    case 'file-selector-template-driven':
      return import('../angular/examples/file-selector');
    case 'filter-sort-paginator-table':
      return import('../angular/examples/table');
    case 'flip-card-basic':
    case 'flip-card-chip':
    case 'flip-card-showcase':
      return import('../angular/examples/flip-card');
    case 'footer-basic':
      return import('../angular/examples/footer');
    case 'footer-clock':
      return import('../angular/examples/footer');
    case 'form-field-clear':
    case 'form-field-hint':
    case 'form-field-native-select':
    case 'form-field-prefix-suffix':
    case 'form-field-showcase':
    case 'form-field-text-counter':
      return import('../angular/examples/form-field');
    case 'grouped-columns-table':
    case 'grouped-rows-and-columns-table':
      return import('../angular/examples/table');
    case 'header-environment':
    case 'header-scroll-origin':
    case 'header-showcase':
      return import('../angular/examples/header');
    case 'icon-basic':
      return import('../angular/examples/icon');
    case 'icon-sidebar-nested':
    case 'icon-sidebar-showcase':
      return import('../angular/examples/icon-sidebar');
    case 'image-basic':
    case 'image-round':
    case 'image-with-chip':
      return import('../angular/examples/image');
    case 'journey-header-showcase':
      return import('../angular/examples/journey-header');
    case 'lead-container-basic':
      return import('../angular/examples/lead-container');
    case 'link-list-anchor-showcase':
      return import('../angular/examples/link-list-anchor');
    case 'link-list-showcase':
      return import('../angular/examples/link-list');
    case 'link-showcase':
      return import('../angular/examples/link');
    case 'loading-indicator-circle-showcase':
      return import('../angular/examples/loading-indicator-circle');
    case 'loading-indicator-showcase':
      return import('../angular/examples/loading-indicator');
    case 'logo-showcase':
      return import('../angular/examples/logo');
    case 'map-container-basic':
      return import('../angular/examples/map-container');
    case 'menu-basic':
    case 'menu-custom-content':
    case 'menu-nested':
      return import('../angular/examples/menu');
    case 'message-basic':
      return import('../angular/examples/message');
    case 'mini-button-group':
    case 'mini-button-showcase':
      return import('../angular/examples/button');
    case 'mini-calendar-basic':
      return import('../angular/examples/mini-calendar');
    case 'native-table':
      return import('../angular/examples/table');
    case 'navigation-basic':
    case 'navigation-section':
      return import('../angular/examples/navigation');
    case 'notification-showcase':
      return import('../angular/examples/notification');
    case 'option-showcase':
      return import('../angular/examples/option');
    case 'overlay-nested':
    case 'overlay-service':
    case 'overlay-showcase':
      return import('../angular/examples/overlay');
    case 'paginator-compact':
    case 'paginator-showcase':
      return import('../angular/examples/paginator');
    case 'paginator-table':
      return import('../angular/examples/table');
    case 'popover-showcase':
      return import('../angular/examples/popover');
    case 'radio-button-group-reactive':
    case 'radio-button-group-showcase':
    case 'radio-button-group-signal':
    case 'radio-button-group-template-driven':
      return import('../angular/examples/radio-button-group');
    case 'radio-button-panel-reactive':
    case 'radio-button-panel-showcase':
    case 'radio-button-panel-signal':
    case 'radio-button-panel-template-driven':
      return import('../angular/examples/radio-button-panel');
    case 'radio-button-showcase':
      return import('../angular/examples/radio-button');
    case 'seat-reservation-basic':
    case 'seat-reservation-bus':
    case 'seat-reservation-multiple-decks':
      return import('../angular-experimental/examples/seat-reservation');
    case 'select-complex-value':
    case 'select-optgroup':
    case 'select-reactive':
    case 'select-showcase':
    case 'select-signal':
    case 'select-template-driven':
      return import('../angular/examples/select');
    case 'selectable-table':
      return import('../angular/examples/table');
    case 'selection-action-panel-basic':
    case 'selection-action-panel-group':
    case 'selection-action-panel-with-expansion':
      return import('../angular/examples/selection-action-panel');
    case 'selection-expansion-panel-basic':
      return import('../angular/examples/selection-expansion-panel');
    case 'sidebar-nested':
    case 'sidebar-showcase':
      return import('../angular/examples/sidebar');
    case 'signet-showcase':
      return import('../angular/examples/signet');
    case 'simple-table':
      return import('../angular/examples/table');
    case 'skiplink-list-basic':
      return import('../angular/examples/skiplink-list');
    case 'slider-basic':
      return import('../angular/examples/slider');
    case 'sortable-table':
      return import('../angular/examples/table');
    case 'status-showcase':
      return import('../angular/examples/status');
    case 'stepper-basic':
      return import('../angular/examples/stepper');
    case 'sticky-table':
      return import('../angular/examples/table');
    case 'tabs-fixed-height':
    case 'tabs-lazy-content':
    case 'tabs-showcase':
    case 'tabs-tab-nav-bar':
      return import('../angular/examples/tabs');
    case 'tag-basic':
      return import('../angular/examples/tag');
    case 'teaser-basic':
      return import('../angular/examples/teaser');
    case 'teaser-hero-basic':
      return import('../angular/examples/teaser-hero');
    case 'teaser-panel-basic':
      return import('../angular/examples/teaser-panel');
    case 'teaser-product-basic':
      return import('../angular/examples/teaser-product');
    case 'time-input-basic':
      return import('../angular/examples/time-input');
    case 'timetable-form-basic':
      return import('../angular/examples/timetable-form');
    case 'timetable-occupancy-icon-showcase':
      return import('../angular/examples/timetable-occupancy-icon');
    case 'timetable-occupancy-showcase':
      return import('../angular/examples/timetable-occupancy');
    case 'title-basic':
      return import('../angular/examples/title');
    case 'toast-basic':
      return import('../angular/examples/toast');
    case 'toggle-basic':
      return import('../angular/examples/toggle');
    case 'toggle-check-basic':
      return import('../angular/examples/toggle-check');
    case 'tooltip-basic':
      return import('../angular/examples/tooltip');
    case 'train-basic':
    case 'train-vertical':
      return import('../angular/examples/train');
    default:
      console.warn(`No example found for component with id "${id}".`);
      return undefined;
  }
}
