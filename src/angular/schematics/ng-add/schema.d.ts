export interface NgAddOptionsSchema {
  /** Name of the project. */
  project: string;
  /** List of lyne-elements themes. */
  theme: 'standard' | 'off-brand' | 'safety' | 'lean' | 'lean-off-brand' | 'lean-safety';
}
