import { TargetVersion } from '@angular/cdk/schematics';

import { AddCommentBase, AddCommentMigrationConfig } from './add-comment-base.cjs';

export class TitleMarginBlockMigration extends AddCommentBase {
  protected override readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'token',
        name: 'title-margin-block',
        stylesheet: {
          '--sbb-title-margin-block': {
            type: 'delete',
            prUrl: 'https://github.com/sbb-design-systems/lyne-components/pull/4913',
          },
        },
      },
    ],
  };
}
