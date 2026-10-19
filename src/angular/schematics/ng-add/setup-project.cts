import { NgAddOptionsSchema } from './schema';
import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace, WorkspaceDefinition } from '@schematics/angular/utility/workspace';
import { addThemeToProject, getProjectName } from '../utils.cjs';

const THEME_PATH_PREFIX = 'node_modules/@sbb-esta/lyne-elements';
const LYNE_ELEMENTS_FALLBACK_THEME = 'standard';

export default function (options: NgAddOptionsSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace: WorkspaceDefinition = await getWorkspace(tree);
    const themePath = `${THEME_PATH_PREFIX}/${options.theme || LYNE_ELEMENTS_FALLBACK_THEME}-theme.css`;
    return chain([
      addThemeToProject(getProjectName(options, workspace), 'build', themePath, context.logger),
      // If karma is used as test runner, the theme is added in its configuration target.
      addThemeToProject(getProjectName(options, workspace), 'test', themePath, context.logger),
    ]);
  };
}
