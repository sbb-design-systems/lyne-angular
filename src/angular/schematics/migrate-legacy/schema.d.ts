export interface MigrateLegacyOptionsSchema {
  /** Name of the project to migrate. */
  project: string;
  /** Legacy module names to migrate (space-separated via CLI). */
  module?: string[];
}
