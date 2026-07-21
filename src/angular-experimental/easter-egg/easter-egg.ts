import { Directive, ElementRef, inject } from '@angular/core';
import { SbbEasterEggElement } from '@sbb-esta/lyne-elements-experimental/easter-egg.pure.js';

/**
 * A hidden easter egg dialog rendering a canvas-based Snake game.

Use the inherited `open()`, `close()` methods and the `isOpen` getter
to control the dialog. The dialog can also be triggered from any element
via the inherited `trigger` id-reference attribute. Score is exposed via
the readonly `score` getter.
 */
@Directive({
  selector: 'sbb-easter-egg',
  exportAs: 'sbbEasterEgg',
})
export class SbbEasterEgg {
  static {
    SbbEasterEggElement.define();
  }

  #element: ElementRef<SbbEasterEggElement> = inject(ElementRef<SbbEasterEggElement>);

  /**
   * The current game score (number of food items eaten in the current run).
   */
  public get score(): number {
    return this.#element.nativeElement.score;
  }

  /**
   * The highest score reached in the current dialog session. Reset on close.
   */
  public get highScore(): number {
    return this.#element.nativeElement.highScore;
  }
}
