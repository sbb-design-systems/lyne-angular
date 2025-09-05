import type { OutputRef } from '@angular/core';

export interface SbbAutocompleteType<T = string> {
  size: 'm' | 's';
  negative: boolean;
  origin: HTMLElement | null;
  trigger: HTMLInputElement | null;
  preserveIconSpace: boolean;
  readonly originElement: HTMLElement | null;
  readonly triggerElement: HTMLInputElement | null | undefined;
  readonly isOpen: boolean;
  autoActiveFirstOption: boolean;
  displayWith: ((value: T) => string) | null;
  beforeOpenOutput: OutputRef<Event>;
  openOutput: OutputRef<Event | undefined>;
  beforeCloseOutput: OutputRef<Event>;
  closeOutput: OutputRef<Event | undefined>;
  optionSelected: OutputRef<Event>;

  open(): void;

  close(): void;
}
