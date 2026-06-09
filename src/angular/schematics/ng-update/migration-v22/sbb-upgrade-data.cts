import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export const SBB_UPGRADE_DATA: UpgradeData = {
  attributeSelectors: {},
  classNames: {},
  cssTokens: {
    [TargetVersion.V22]: [
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/issues/4847',
        changes: [
          { replace: '--sbb-title-text-color-normal', replaceWith: '--sbb-title-color' },
          { replace: '--sbb-title-text-color-normal-override', replaceWith: '--sbb-title-color' },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/issues/4796',
        changes: [
          {
            replace: '--sbb-train-formation-padding-inline',
            replaceWith: '--sbb-train-formation-scroll-padding',
          },
        ],
      },
    ],
  },
  constructorChecks: {},
  cssSelectors: {},
  elementSelectors: {},
  inputNames: {
    [TargetVersion.V22]: [
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4916',
        changes: [
          {
            replace: 'listAccessibilityLabel',
            replaceWith: 'accessibilityLabel',
            limitedTo: {
              elements: ['sbb-tag-group'],
            },
          },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/issues/4940',
        changes: [
          {
            replace: 'selected',
            replaceWith: 'value',
            limitedTo: {
              elements: ['sbb-calendar'],
            },
          },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/issues/4796',
        changes: [
          {
            replace: 'type',
            replaceWith: 'wagonType',
            limitedTo: {
              elements: ['train-wagon'],
            },
          },
        ],
      },
    ],
  },
  methodCallChecks: {},
  outputNames: {},
  propertyNames: {
    [TargetVersion.V22]: [
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4916',
        changes: [
          {
            replace: 'listAccessibilityLabel',
            replaceWith: 'accessibilityLabel',
            limitedTo: {
              classes: ['SbbTagGroup'],
            },
          },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4940',
        changes: [
          {
            replace: 'selected',
            replaceWith: 'value',
            limitedTo: {
              classes: ['SbbCalendar'],
            },
          },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4796',
        changes: [
          {
            replace: 'type',
            replaceWith: 'wagonType',
            limitedTo: {
              classes: ['SbbTrainWagon'],
            },
          },
        ],
      },
    ],
  },
  symbolRemoval: {},
};
