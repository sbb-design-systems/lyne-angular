import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AbstractConstructor } from '@sbb-esta/lyne-elements/core/mixins.js';

/**
 * Patches the behavior of the Angular RouterLink.
 * With this patch the RouterLink recognizes the web component links
 * as native links and processes them correctly.
 * TODO: Check whether there is support of Angular for that case:
 *  - https://github.com/angular/angular/pull/59567
 *  - https://github.com/angular/angular/issues/28345
 */
export const SbbRouterLinkSupportMixin = <T extends AbstractConstructor>(
  superclass: T,
): AbstractConstructor & T => {
  abstract class SbbRouterLink extends superclass {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

      const routerLink = inject(RouterLink, { optional: true }) as unknown as {
        isAnchorElement: boolean;
        updateHref: () => void;
        setTabIndexIfNotOnNativeEl: (newTabIndex: string | null) => void;
      };

      if (!routerLink) {
        return;
      }

      routerLink.setTabIndexIfNotOnNativeEl(null);
      routerLink.isAnchorElement = true;

      inject(Router)
        .events.pipe(takeUntilDestroyed())
        .subscribe((s) => {
          if (s instanceof NavigationEnd) {
            routerLink.updateHref();
          }
        });
    }
  }
  return SbbRouterLink as unknown as AbstractConstructor & T;
};
