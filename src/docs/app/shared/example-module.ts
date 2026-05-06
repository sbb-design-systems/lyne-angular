import type { Type } from '@angular/core';

import type { ExampleData } from './example-data';

export const EXAMPLE_COMPONENTS: Record<string, (string | Partial<ExampleData>)[]> = {
  accordion: [
    'accordion-basic',
    'accordion-nested-lazy',
    'accordion-variants',
    { id: 'accordion-wizard', hasStyle: true },
  ],
  'action-group': ['action-group-basic', { id: 'action-group-complex', hasStyle: true }],
  alert: ['alert-basic'],
  autocomplete: [
    'autocomplete-basic',
    'autocomplete-hint-optgroup',
    'autocomplete-reactive',
    'autocomplete-template',
  ],
  badge: ['badge-basic', 'badge-before', 'badge-header-button'],
  breadcrumb: ['breadcrumb-basic'],
  button: ['button-basic', 'mini-button-basic'],
  calendar: ['calendar-basic', 'calendar-reactive', 'calendar-fixed-month'],
  card: ['card-basic'],
  carousel: ['carousel-basic'],
  checkbox: ['checkbox-basic'],
  'checkbox-group': ['checkbox-group-basic'],
  'checkbox-panel': ['checkbox-panel-basic'],
  chip: ['chip-basic'],
  'chip-label': ['chip-label-basic'],
  clock: ['clock-basic'],
  container: ['container-basic'],
  'date-input': ['date-input-basic'],
  datepicker: ['datepicker-basic'],
  dialog: ['dialog-basic'],
  divider: ['divider-basic'],
  'expansion-panel': ['expansion-panel-basic'],
  'file-selector': ['file-selector-basic'],
  'flip-card': ['flip-card-basic'],
  footer: ['footer-basic', 'footer-clock'],
  'form-field': [
    { id: 'form-field-basic', hasStyle: true },
    'form-field-native-select',
    'form-field-clear',
    'form-field-hint',
    'form-field-text-counter',
    'form-field-prefix-suffix',
  ],
  header: ['header-basic'],
  icon: ['icon-basic'],
  'icon-sidebar': [{ id: 'icon-sidebar-basic', hasStyle: true }],
  image: ['image-basic'],
  'journey-header': ['journey-header-basic'],
  'lead-container': ['lead-container-basic'],
  link: ['link-basic'],
  'link-list': ['link-list-basic'],
  'link-list-anchor': ['link-list-anchor-basic'],
  'loading-indicator': ['loading-indicator-basic'],
  'loading-indicator-circle': ['loading-indicator-circle-basic'],
  logo: ['logo-basic'],
  'map-container': ['map-container-basic'],
  menu: ['menu-basic'],
  message: ['message-basic'],
  'mini-calendar': ['mini-calendar-basic'],
  navigation: ['navigation-basic'],
  notification: ['notification-basic'],
  option: ['option-basic'],
  overlay: ['overlay-basic'],
  paginator: ['paginator-basic'],
  popover: ['popover-basic'],
  'radio-button': ['radio-button-basic'],
  'radio-button-group': ['radio-button-group-basic'],
  'radio-button-panel': ['radio-button-panel-basic'],
  'seat-reservation': [
    'seat-reservation-basic',
    'seat-reservation-multiple-decks',
    'seat-reservation-bus',
  ],
  select: ['select-basic'],
  'selection-action-panel': ['selection-action-panel-basic'],
  'selection-expansion-panel': ['selection-expansion-panel-basic'],
  sidebar: [{ id: 'sidebar-basic', hasStyle: true }],
  signet: ['signet-basic'],
  'skiplink-list': ['skiplink-list-basic'],
  slider: ['slider-basic'],
  status: ['status-basic'],
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
  tabs: ['tabs-basic'],
  tag: ['tag-basic'],
  teaser: ['teaser-basic'],
  'teaser-hero': ['teaser-hero-basic'],
  'teaser-panel': ['teaser-panel-basic'],
  'teaser-product': ['teaser-product-basic'],
  'time-input': ['time-input-basic'],
  'timetable-form': ['timetable-form-basic'],
  'timetable-occupancy': ['timetable-occupancy-basic'],
  'timetable-occupancy-icon': ['timetable-occupancy-icon-basic'],
  title: ['title-basic'],
  toast: ['toast-basic'],
  toggle: ['toggle-basic'],
  'toggle-check': ['toggle-check-basic'],
  tooltip: ['tooltip-basic'],
  train: ['train-basic'],
};

export async function loadExample(id: string): Promise<Record<string, Type<unknown>> | undefined> {
  switch (id) {
    case 'accordion-basic':
    case 'accordion-nested-lazy':
    case 'accordion-variants':
    case 'accordion-wizard':
      return import('../angular/examples/accordion');
    case 'action-group-basic':
    case 'action-group-complex':
      return import('../angular/examples/action-group');
    case 'alert-basic':
      return import('../angular/examples/alert');
    case 'autocomplete-basic':
    case 'autocomplete-hint-optgroup':
    case 'autocomplete-reactive':
    case 'autocomplete-template':
      return import('../angular/examples/autocomplete');
    case 'badge-basic':
      return import('../angular/examples/badge');
    case 'badge-before':
      return import('../angular/examples/badge');
    case 'badge-header-button':
      return import('../angular/examples/badge');
    case 'breadcrumb-basic':
      return import('../angular/examples/breadcrumb');
    case 'button-basic':
      return import('../angular/examples/button');
    case 'calendar-basic':
    case 'calendar-fixed-month':
      return import('../angular/examples/calendar');
    case 'calendar-reactive':
      return import('../angular/examples/calendar');
    case 'card-basic':
      return import('../angular/examples/card');
    case 'carousel-basic':
      return import('../angular/examples/carousel');
    case 'checkbox-basic':
      return import('../angular/examples/checkbox');
    case 'checkbox-group-basic':
      return import('../angular/examples/checkbox-group');
    case 'checkbox-panel-basic':
      return import('../angular/examples/checkbox-panel');
    case 'chip-basic':
      return import('../angular/examples/chip');
    case 'chip-label-basic':
      return import('../angular/examples/chip-label');
    case 'clock-basic':
      return import('../angular/examples/clock');
    case 'container-basic':
      return import('../angular/examples/container');
    case 'date-input-basic':
      return import('../angular/examples/date-input');
    case 'datepicker-basic':
      return import('../angular/examples/datepicker');
    case 'dialog-basic':
      return import('../angular/examples/dialog');
    case 'divider-basic':
      return import('../angular/examples/divider');
    case 'expandable-table':
      return import('../angular/examples/table');
    case 'expansion-panel-basic':
      return import('../angular/examples/expansion-panel');
    case 'file-selector-basic':
      return import('../angular/examples/file-selector');
    case 'filter-sort-paginator-table':
      return import('../angular/examples/table');
    case 'flip-card-basic':
      return import('../angular/examples/flip-card');
    case 'footer-basic':
      return import('../angular/examples/footer');
    case 'footer-clock':
      return import('../angular/examples/footer');
    case 'form-field-basic':
      return import('../angular/examples/form-field');
    case 'form-field-clear':
      return import('../angular/examples/form-field');
    case 'form-field-hint':
      return import('../angular/examples/form-field');
    case 'form-field-native-select':
      return import('../angular/examples/form-field');
    case 'form-field-prefix-suffix':
      return import('../angular/examples/form-field');
    case 'form-field-text-counter':
      return import('../angular/examples/form-field');
    case 'grouped-columns-table':
      return import('../angular/examples/table');
    case 'grouped-rows-and-columns-table':
      return import('../angular/examples/table');
    case 'header-basic':
      return import('../angular/examples/header');
    case 'icon-basic':
      return import('../angular/examples/icon');
    case 'icon-sidebar-basic':
      return import('../angular/examples/icon-sidebar');
    case 'image-basic':
      return import('../angular/examples/image');
    case 'journey-header-basic':
      return import('../angular/examples/journey-header');
    case 'lead-container-basic':
      return import('../angular/examples/lead-container');
    case 'link-basic':
      return import('../angular/examples/link');
    case 'link-list-anchor-basic':
      return import('../angular/examples/link-list-anchor');
    case 'link-list-basic':
      return import('../angular/examples/link-list');
    case 'loading-indicator-basic':
      return import('../angular/examples/loading-indicator');
    case 'loading-indicator-circle-basic':
      return import('../angular/examples/loading-indicator-circle');
    case 'logo-basic':
      return import('../angular/examples/logo');
    case 'map-container-basic':
      return import('../angular/examples/map-container');
    case 'menu-basic':
      return import('../angular/examples/menu');
    case 'message-basic':
      return import('../angular/examples/message');
    case 'mini-button-basic':
      return import('../angular/examples/button');
    case 'mini-calendar-basic':
      return import('../angular/examples/mini-calendar');
    case 'native-table':
      return import('../angular/examples/table');
    case 'navigation-basic':
      return import('../angular/examples/navigation');
    case 'notification-basic':
      return import('../angular/examples/notification');
    case 'option-basic':
      return import('../angular/examples/option');
    case 'overlay-basic':
      return import('../angular/examples/overlay');
    case 'paginator-basic':
      return import('../angular/examples/paginator');
    case 'paginator-table':
      return import('../angular/examples/table');
    case 'popover-basic':
      return import('../angular/examples/popover');
    case 'radio-button-basic':
      return import('../angular/examples/radio-button');
    case 'radio-button-group-basic':
      return import('../angular/examples/radio-button-group');
    case 'radio-button-panel-basic':
      return import('../angular/examples/radio-button-panel');
    case 'seat-reservation-basic':
    case 'seat-reservation-bus':
    case 'seat-reservation-multiple-decks':
      return import('../angular-experimental/examples/seat-reservation');
    case 'select-basic':
      return import('../angular/examples/select');
    case 'selectable-table':
      return import('../angular/examples/table');
    case 'selection-action-panel-basic':
      return import('../angular/examples/selection-action-panel');
    case 'selection-expansion-panel-basic':
      return import('../angular/examples/selection-expansion-panel');
    case 'sidebar-basic':
      return import('../angular/examples/sidebar');
    case 'signet-basic':
      return import('../angular/examples/signet');
    case 'simple-table':
      return import('../angular/examples/table');
    case 'skiplink-list-basic':
      return import('../angular/examples/skiplink-list');
    case 'slider-basic':
      return import('../angular/examples/slider');
    case 'sortable-table':
      return import('../angular/examples/table');
    case 'status-basic':
      return import('../angular/examples/status');
    case 'stepper-basic':
      return import('../angular/examples/stepper');
    case 'sticky-table':
      return import('../angular/examples/table');
    case 'tabs-basic':
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
    case 'timetable-occupancy-basic':
      return import('../angular/examples/timetable-occupancy');
    case 'timetable-occupancy-icon-basic':
      return import('../angular/examples/timetable-occupancy-icon');
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
      return import('../angular/examples/train');
    default:
      console.warn(`No example found for component with id "${id}".`);
      return undefined;
  }
}
