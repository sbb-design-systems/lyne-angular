import type { SbbFormFieldElementControl } from '@sbb-esta/lyne-elements/form-field.js';
import type { Observable } from 'rxjs';

/** An interface which allows a control to work inside of an `SbbFormField`. */
export abstract class SbbFormFieldControl implements SbbFormFieldElementControl {
  /**
   * Stream that must emit whenever the state of the control changes in order for the
   * parent `SbbFormField` to run change detection.
   */
  abstract readonly stateChanges: Observable<void>;
  /** The id of the form field. */
  abstract readonly id: string;
  /** Whether the control is empty. */
  abstract readonly empty: boolean;
  /** Whether the control is disabled. */
  abstract readonly disabled: boolean;
  /** Whether the control is readonly. */
  abstract readonly readOnly?: boolean;

  /** Handles a click on the control's container. */
  abstract onContainerClick(event: MouseEvent): void;
}
