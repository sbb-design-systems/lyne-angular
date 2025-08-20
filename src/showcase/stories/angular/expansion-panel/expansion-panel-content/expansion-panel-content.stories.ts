import { SbbExpansionPanelContent } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-content';
import type { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-accordion/sbb-expansion-panel-content',
  component: SbbExpansionPanelContent,
  render: () => ({
    template: `
    <div>
      'sbb-expansion-panel-content' is an element to be only used together with 'sbb-expansion-panel'.
      See 'sbb-expansion-panel' examples to see it in action.
    </div>
    `,
  }),
};
export default meta;

export const Default = {};
