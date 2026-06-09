import { TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

import { AddCommentBase, AddCommentMigrationConfig } from './add-comment-base.cjs';

export class OverlayConfigMigration extends AddCommentBase {
  protected override readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'custom',
        name: 'sbb-overlay-config-deprecation',
        tsMatcher(node: ts.Node): string | null {
          if (ts.isIdentifier(node) && node.text === 'SbbOverlayConfig') {
            if (node.parent && ts.isImportSpecifier(node.parent)) {
              return null;
            }

            return `FIXME: the usage of \`SbbOverlayConfig\` has been changed.
              If you are using it to open a \`SbbOverlay\`, you have to adapt your import to \`@sbb-esta/lyne-angular/overlay\`.
              If you are using it to open a \`SbbDialog\`, change it to \`SbbDialogConfig\` and adapt your import to \`@sbb-esta/lyne-angular/dialog\`.
              If you are using it to open a \`SbbToast\`, change it to \`SbbToastConfig\` and adapt your import to \`@sbb-esta/lyne-angular/toast\`.
            `;
          }

          return null;
        },
      },
    ],
  };
}
