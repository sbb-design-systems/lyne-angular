import { TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

import {
  AddCommentBase,
  AddCommentMigrationConfig,
  ReplaceTokenAction,
} from './add-comment-base.cjs';

const TYPE_PULL_REQUEST_URL = 'https://github.com/sbb-design-systems/lyne-components/pull/4864';
const EVENTS_PULL_REQUEST_URL = 'https://github.com/sbb-design-systems/lyne-components/pull/4918';

const TYPE_REPLACEMENTS: Record<string, string> = {
  CalendarView: "'day' | 'month' | 'year'",
  LinkTargetType: "'_blank' | '_self' | '_parent' | '_top'",
  PlaceState: "'FREE' | 'ALLOCATED' | 'RESTRICTED' | 'SELECTED'",
  PlaceType: "'SEAT' | 'BICYCLE'",
  SbbButtonSize: "'s' | 'm' | 'l'",
  SbbButtonType: "'button' | 'reset' | 'submit'",
  SbbCheckboxSize: "'xs' | 's' | 'm'",
  SbbFlipCardImageAlignment: "'after' | 'below'",
  SbbHorizontalFrom: "'zero' | 'small' | 'large' | 'ultra'",
  SbbIconPlacement: "'start' | 'end'",
  SbbLanguage: 'Record<string, string>',
  SbbLinkSize: "'xs' | 's' | 'm'",
  SbbMiniButtonGroupSize: "'s' | 'm' | 'l' | 'xl'",
  SbbNavigationActionSize: "'s' | 'm' | 'l'",
  SbbOccupancy: "'high' | 'medium' | 'low' | 'none'",
  SbbOrientation: "'horizontal' | 'vertical'",
  SbbProtectiveRoom: "'none' | 'minimal' | 'ideal'",
  SbbRadioButtonSize: "'xs' | 's' | 'm'",
  SbbSignetProtectiveRoom: "'none' | 'minimal' | 'ideal' | 'panel'",
  SbbStatusType:
    "'info' | 'success' | 'warning' | 'error' | 'pending' | 'incomplete' | 'not-started' | 'in-progress'",
  SbbTagSize: "'s' | 'm'",
  SbbTime: '`${number}:${number}:${number}`',
  SbbTitleLevel: 'SbbHeadingLevel',
  SbbToastPosition: "`${'top' | 'bottom'}-${'left' | 'start' | 'center' | 'right' | 'end'}`",
  TravelDirection: "'LEFT' | 'RIGHT' | 'NONE'",
};

const EVENT_REPLACEMENTS: Record<string, string> = {
  'CustomEvent<{ option: SbbOptionBaseElement<T> }>': 'SbbInputAutocompleteEvent<T>',
  'CustomEvent<T[] | T>': 'SbbDateSelectedEvent<T>',
  'CustomEvent<SbbCarouselItemEventDetail>': 'SbbCarouselItemShowEvent',
  'CustomEvent<SbbChipInputTokenEndEventDetails>': 'SbbChipInputTokenEndEvent',
  'CustomEvent<{ closeTarget: HTMLElement | null }>': 'SbbPopoverCloseEvent',
  'CustomEvent<Readonly<File>[]>': 'SbbFileChangeEvent',
  'CustomEvent<SbbPaginatorPageEventDetails>': 'SbbPaginatorPageEvent',
  'CustomEvent<SbbStepValidateEventDetails>': 'SbbStepValidateEvent',
  'CustomEvent<SbbTabChangedEventDetails>': 'SbbTabChangeEvent',
};

function toReplaceActions(
  replacements: Record<string, string>,
  prUrl: string,
): Record<string, ReplaceTokenAction> {
  return Object.fromEntries(
    Object.entries(replacements).map(([token, replacement]): [string, ReplaceTokenAction] => [
      token,
      { type: 'replace', replacement, prUrl },
    ]),
  );
}

export class RemoveTypesMigration extends AddCommentBase {
  protected override readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'token',
        name: 'remove-types',
        tsKinds: [ts.SyntaxKind.TypeReference],
        ts: {
          ...toReplaceActions(TYPE_REPLACEMENTS, TYPE_PULL_REQUEST_URL),
          ...toReplaceActions(EVENT_REPLACEMENTS, EVENTS_PULL_REQUEST_URL),
        },
      },
    ],
  };
}
