import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import type { CdkColumnDef } from '@angular/cdk/table';
import type { AfterViewInit, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import type { Subscription } from 'rxjs';
import { merge } from 'rxjs';

import type { SbbSortable, SbbSortHeaderArrowPosition } from './sort';
import { SBB_SORT_DEFAULT_OPTIONS, SbbSort } from './sort';
import { sbbSortAnimations } from './sort-animations';
import type { SbbSortDirection } from './sort-direction';
import { getSortHeaderNotContainedWithinSortError } from './sort-errors';

/** Variable replaced at build time that indicates whether the app is in development mode. */
declare const ngDevMode: object | null;

/**
 * Valid positions for the arrow to be in for its opacity and translation. If the state is a
 * sort direction, the position of the arrow will be above/below and opacity 0. If the state is
 * hint, the arrow will be in the center with a slight opacity. Active state means the arrow will
 * be fully opaque in the center.
 *
 * @docs-private
 */
export type SbbArrowViewState = SbbSortDirection | 'hint' | 'active';

/**
 * States describing the arrow's animated position (animating fromState to toState).
 * If the fromState is not defined, there will be no animated transition to the toState.
 * @docs-private
 */
export interface SbbArrowViewStateTransition {
  fromState?: SbbArrowViewState;
  toState?: SbbArrowViewState;
}

/** Column definition associated with a `SbbSortHeader`. */
interface SbbSortHeaderColumnDef {
  name: string;
}

/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent SbbSort.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[sbb-sort-header]',
  exportAs: 'sbbSortHeader',
  templateUrl: 'sort-header.html',
  styleUrls: ['sort-header.scss'],
  host: {
    class: 'sbb-sort-header',
    '(click)': '_handleClick()',
    '(keydown)': '_handleKeydown($event)',
    '(mouseenter)': '_setIndicatorHintVisible(true)',
    '(mouseleave)': '_setIndicatorHintVisible(false)',
    '[attr.aria-sort]': '_getAriaSortAttribute()',
    '[class.sbb-sort-header-disabled]': '_isDisabled()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    sbbSortAnimations.arrowOpacity,
    sbbSortAnimations.arrowPosition,
    sbbSortAnimations.allowChildren,
    sbbSortAnimations.indicator,
  ],
})
export class SbbSortHeader implements SbbSortable, OnDestroy, OnInit, AfterViewInit {
  #rerenderSubscription!: Subscription;

  /**
   * The element with role="button" inside this component's view. We need this
   * in order to apply a description with AriaDescriber.
   */
  #sortButton!: HTMLElement;

  /**
   * Flag set to true when the indicator should be displayed while the sort is not active. Used to
   * provide an affordance that the header is sortable by showing on focus and hover.
   */
  _showIndicatorHint: boolean = false;

  /**
   * The view transition state of the arrow (translation/ opacity) - indicates its `from` and `to`
   * position through the animation. If animations are currently disabled, the fromState is removed
   * so that there is no animation displayed.
   */
  _viewState: SbbArrowViewStateTransition = {};

  /** The direction the arrow should be facing according to the current state. */
  _arrowDirection: SbbSortDirection = '';

  /** Whether the view state animation should show the transition between the `from` and `to` states. */
  _disableViewStateAnimation: boolean = false;

  /**
   * ID of this sort header. If used within the context of a CdkColumnDef, this will default to
   * the column's name.
   */
  @Input('sbb-sort-header') id!: string;

  /** Sets the position of the arrow that displays when sorted. */
  @Input() arrowPosition: SbbSortHeaderArrowPosition = 'after';

  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /** Overrides the sort start value of the containing SbbSort for this SbbSortable. */
  @Input() start!: SbbSortDirection;

  /**
   * Description applied to SbbSortHeader's button element with aria-describedby. This text should
   * describe the action that will occur when the user clicks the sort header.
   */
  @Input()
  get sortActionDescription(): string {
    return this.#sortActionDescription;
  }
  set sortActionDescription(value: string) {
    this.#updateSortActionDescription(value);
  }
  // Default the action description to "Sort" because it's better than nothing.
  // Without a description, the button's label comes from the sort header text content,
  // which doesn't give any indication that it performs a sorting operation.
  #sortActionDescription: string = 'Sort';

  /** Overrides the disable clear value of the containing MatSort for this MatSortable. */
  @Input({ transform: booleanAttribute })
  disableClear!: boolean;

  #changeDetectorRef = inject(ChangeDetectorRef);
  #sort = inject(SbbSort, { optional: true });

  // Note that we use a string token for the `_columnDef`, because the value is provided both by
  // `angular/table` and `cdk/table` and we can't have the CDK depending on Lyne Angular,
  // and we want to avoid having the sort header depending on the CDK table because
  // of this single reference.
  #columnDef = inject(
    'SBB_SORT_HEADER_COLUMN_DEF' as unknown as InjectionToken<SbbSortHeaderColumnDef>,
    {
      optional: true,
    },
  );
  #columnDefCdk = inject('MAT_SORT_HEADER_COLUMN_DEF' as unknown as InjectionToken<CdkColumnDef>, {
    optional: true,
  });
  #focusMonitor = inject(FocusMonitor);
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #ariaDescriber = inject(AriaDescriber);
  #sortOptions = inject(SBB_SORT_DEFAULT_OPTIONS, { optional: true });

  constructor() {
    if (!this.#sort && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw getSortHeaderNotContainedWithinSortError();
    }

    if (this.#sortOptions?.arrowPosition) {
      this.arrowPosition = this.#sortOptions?.arrowPosition;
    }

    this.#handleStateChanges();
  }

  ngOnInit() {
    if (!this.id && this.#columnDef) {
      this.id = this.#columnDef.name;
    } else if (!this.id && this.#columnDefCdk) {
      this.id = this.#columnDefCdk.name;
    }

    // Initialize the direction of the arrow and set the view state to be immediately that state.
    this._updateArrowDirection();
    this._setAnimationTransitionState({
      toState: this._isSorted() ? 'active' : this._arrowDirection,
    });

    this.#sort?.register(this);

    this.#sortButton = this.#elementRef.nativeElement.querySelector('.sbb-sort-header-container')!;
    this.#updateSortActionDescription(this.#sortActionDescription);
  }

  ngAfterViewInit() {
    // We use the focus monitor because we also want to style
    // things differently based on the focus origin.
    this.#focusMonitor.monitor(this.#elementRef, true).subscribe((origin) => {
      const newState = !!origin;
      if (newState !== this._showIndicatorHint) {
        this._setIndicatorHintVisible(newState);
        this.#changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.#focusMonitor.stopMonitoring(this.#elementRef);
    this.#sort?.deregister(this);
    this.#rerenderSubscription.unsubscribe();
  }

  /**
   * Sets the "hint" state such that the arrow will be semi-transparently displayed as a hint to the
   * user showing what the active sort will become. If set to false, the arrow will fade away.
   */
  _setIndicatorHintVisible(visible: boolean) {
    // No-op if the sort header is disabled - should not make the hint visible.
    if (this._isDisabled() && visible) {
      return;
    }

    this._showIndicatorHint = visible;

    if (!this._isSorted()) {
      this._updateArrowDirection();
      if (this._showIndicatorHint) {
        this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'hint' });
      } else {
        this._setAnimationTransitionState({ fromState: 'hint', toState: this._arrowDirection });
      }
    }
  }

  /**
   * Sets the animation transition view state for the arrow's position and opacity. If the
   * `disableViewStateAnimation` flag is set to true, the `fromState` will be ignored so that
   * no animation appears.
   */
  _setAnimationTransitionState(viewState: SbbArrowViewStateTransition) {
    this._viewState = viewState || {};

    // If the animation for arrow position state (opacity/translation) should be disabled,
    // remove the fromState so that it jumps right to the toState.
    if (this._disableViewStateAnimation) {
      this._viewState = { toState: viewState.toState };
    }
  }

  /** Triggers the sort on this sort header and removes the indicator hint. */
  _toggleOnInteraction() {
    this.#sort?.sort(this);

    // Do not show the animation if the header was already shown in the right position.
    if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
      this._disableViewStateAnimation = true;
    }
  }

  _handleClick() {
    if (!this._isDisabled()) {
      this.#sort?.sort(this);
    }
  }

  _handleKeydown(event: KeyboardEvent) {
    if (!this._isDisabled() && (event.keyCode === SPACE || event.keyCode === ENTER)) {
      event.preventDefault();
      this._toggleOnInteraction();
    }
  }

  /** Whether this SbbSortHeader is currently sorted in either ascending or descending order. */
  _isSorted() {
    return (
      this.#sort?.active === this.id &&
      (this.#sort.direction === 'asc' || this.#sort.direction === 'desc')
    );
  }

  /** Returns the animation state for the arrow direction (indicator and pointers). */
  _getArrowDirectionState() {
    return `${this._isSorted() ? 'active-' : ''}${this._arrowDirection}`;
  }

  /** Returns the arrow position state (opacity, translation). */
  _getArrowViewState() {
    const fromState = this._viewState.fromState;
    return (fromState ? `${fromState}-to-` : '') + this._viewState.toState;
  }

  /**
   * Updates the direction the arrow should be pointing. If it is not sorted, the arrow should be
   * facing the start direction. Otherwise if it is sorted, the arrow should point in the currently
   * active sorted direction. The reason this is updated through a function is because the direction
   * should only be changed at specific times - when deactivated but the hint is displayed and when
   * the sort is active and the direction changes. Otherwise the arrow's direction should linger
   * in cases such as the sort becoming deactivated but we want to animate the arrow away while
   * preserving its direction, even though the next sort direction is actually different and should
   * only be changed once the arrow displays again (hint or activation).
   */
  _updateArrowDirection() {
    this._arrowDirection =
      (this._isSorted() ? this.#sort?.direction : this.start || this.#sort?.start) ?? 'asc';
  }

  _isDisabled() {
    return this.#sort?.disabled || this.disabled;
  }

  /**
   * Gets the aria-sort attribute that should be applied to this sort header. If this header
   * is not sorted, returns null so that the attribute is removed from the host element. Aria spec
   * says that the aria-sort property should only be present on one header at a time, so removing
   * ensures this is true.
   */
  _getAriaSortAttribute() {
    if (!this._isSorted()) {
      return 'none';
    }

    return this.#sort?.direction === 'asc' ? 'ascending' : 'descending';
  }

  /** Whether the arrow inside the sort header should be rendered. */
  _renderArrow() {
    return !this._isDisabled() || this._isSorted();
  }

  #updateSortActionDescription(newDescription: string) {
    // We use AriaDescriber for the sort button instead of setting an `aria-label` because some
    // screen readers (notably VoiceOver) will read both the column header *and* the button's label
    // for every *cell* in the table, creating a lot of unnecessary noise.

    // If _sortButton is undefined, the component hasn't been initialized yet so there's
    // nothing to update in the DOM.
    if (this.#sortButton) {
      // removeDescription will no-op if there is no existing message.
      this.#ariaDescriber.removeDescription(this.#sortButton, this.#sortActionDescription);
      this.#ariaDescriber.describe(this.#sortButton, newDescription);
    }

    this.#sortActionDescription = newDescription;
  }

  /** Handles changes in the sorting state. */
  #handleStateChanges() {
    if (!this.#sort) {
      return;
    }
    this.#rerenderSubscription = merge(this.#sort.sortChange, this.#sort._stateChanges).subscribe(
      () => {
        if (this._isSorted()) {
          this._updateArrowDirection();

          // Do not show the animation if the header was already shown in the right position.
          if (this._viewState.toState === 'hint' || this._viewState.toState === 'active') {
            this._disableViewStateAnimation = true;
          }

          this._setAnimationTransitionState({ fromState: this._arrowDirection, toState: 'active' });
          this._showIndicatorHint = false;
        }

        // If this header was recently active and now no longer sorted, animate away the arrow.
        if (!this._isSorted() && this._viewState && this._viewState.toState === 'active') {
          this._disableViewStateAnimation = false;
          this._setAnimationTransitionState({ fromState: 'active', toState: this._arrowDirection });
        }

        this.#changeDetectorRef.markForCheck();
      },
    );
  }
}
