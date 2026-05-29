import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

interface Hit {
  pos: number;
  oldType: string;
  newType: string;
}

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
  SbbToastPosition:
    "'top-left' | 'top-start' | 'top-center' | 'top-right' | 'top-end' | 'bottom-left' | 'bottom-start' | 'bottom-center' | 'bottom-right' | 'bottom-end'",
  TravelDirection: "'LEFT' | 'RIGHT' | 'NONE'",
};

const OLD_TYPES_PATTERN = new RegExp(`\\b(${Object.keys(TYPE_REPLACEMENTS).join('|')})\\b`);
const PULL_REQUEST_URL = 'https://github.com/sbb-design-systems/lyne-components/pull/4864';

function buildFixme(oldType: string, newType: string): string {
  return `// FIXME: "${oldType}" has been replaced by "${newType}". Check ${PULL_REQUEST_URL} .`;
}

function collectHits(sourceFile: ts.SourceFile): Hit[] {
  const hits: Hit[] = [];

  function visit(node: ts.Node): void {
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
      const name = node.typeName.text;
      if (name in TYPE_REPLACEMENTS) {
        hits.push({
          pos: node.getStart(sourceFile),
          oldType: name,
          newType: TYPE_REPLACEMENTS[name],
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return hits;
}

export function addFixmeTypes(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tsFiles: string[] = [];

    tree.visit((filePath) => {
      if (
        filePath.includes('/node_modules/') ||
        filePath.includes('/dist/') ||
        !filePath.endsWith('.ts') ||
        filePath.endsWith('.d.ts')
      ) {
        return;
      }
      tsFiles.push(filePath);
    });

    for (const filePath of tsFiles) {
      const buffer = tree.read(filePath);
      if (!buffer) {
        continue;
      }

      const sourceText = buffer.toString('utf-8');
      if (!OLD_TYPES_PATTERN.test(sourceText)) {
        continue;
      }

      const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);

      const hits: Hit[] = collectHits(sourceFile);
      if (hits.length === 0) {
        continue;
      }
      hits.sort((a: Hit, b: Hit): number => b.pos - a.pos);

      const recorder = tree.beginUpdate(filePath);
      let changesApplied = false;

      for (const hit of hits) {
        const lineStart = Math.max(0, sourceText.lastIndexOf('\n', hit.pos - 1) + 1);
        const previousLineStart = sourceText.lastIndexOf('\n', lineStart - 2) + 1;
        const previousLineText = sourceText.slice(previousLineStart, lineStart);

        if (previousLineText.includes(PULL_REQUEST_URL)) {
          continue; // The comment is already there on the line above, skip!
        }

        const indent = sourceText.slice(lineStart, hit.pos).match(/^\s*/)?.[0] ?? '';
        const comment = `${indent}${buildFixme(hit.oldType, hit.newType)}\n`;
        recorder.insertLeft(lineStart, comment);
        changesApplied = true;

        const cleanLogPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
        context.logger.info(`  → FIXME added for type '${hit.oldType}' in ${cleanLogPath}`);
      }

      if (changesApplied) {
        tree.commitUpdate(recorder);
      }
    }

    return tree;
  };
}
