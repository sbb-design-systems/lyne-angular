import { Migration, TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

export class TypeFixmeMigration extends Migration<null> {
  static readonly TYPE_REPLACEMENTS: Record<string, string> = {
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

  enabled = this.targetVersion === TargetVersion.V22;

  private readonly PULL_REQUEST_URL =
    'https://github.com/sbb-design-systems/lyne-components/pull/4864';

  override visitNode(node: ts.Node): void {
    if (!ts.isTypeReferenceNode(node) || !ts.isIdentifier(node.typeName)) {
      return;
    }

    const typeName = node.typeName.text;
    const replacementType = TypeFixmeMigration.TYPE_REPLACEMENTS[typeName];

    if (replacementType) {
      this._addCommentAboveNode(node, typeName, replacementType);
    }
  }

  private _addCommentAboveNode(node: ts.Node, oldType: string, newType: string): void {
    const sourceFile = node.getSourceFile();
    const fileText = sourceFile.text;

    const lineStart = Math.max(0, fileText.lastIndexOf('\n', node.getStart() - 1) + 1);
    const previousLineStart = fileText.lastIndexOf('\n', lineStart - 2) + 1;
    const previousLineText = fileText.slice(previousLineStart, lineStart);

    if (previousLineText.includes(this.PULL_REQUEST_URL)) {
      return; // Comment already exists, skip it!
    }

    const indent = fileText.slice(lineStart, node.getStart()).match(/^\s*/)?.[0] ?? '';
    const comment = `${indent}// FIXME: "${oldType}" has been replaced by "${newType}". Check ${this.PULL_REQUEST_URL} .\n`;

    const filePath = this.fileSystem.resolve(sourceFile.fileName);
    const recorder = this.fileSystem.edit(filePath);
    recorder.insertLeft(lineStart, comment);
    this.logger.info(`  → FIXME added for '${oldType}' in ${sourceFile.fileName}`);
  }
}
