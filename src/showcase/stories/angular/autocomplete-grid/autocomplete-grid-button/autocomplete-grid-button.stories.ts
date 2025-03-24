import { SbbAutocompleteGridButton } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { StoryContext } from '@storybook/types';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbAutocompleteGridRow, SbbAutocompleteGridCell],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-button',
  component: SbbAutocompleteGridButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  args: {
    'icon-name': 'pie-small',
    disabled: false,
    negative: false,
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-row  ${args['negative'] ? 'data-negative' : ''}>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button ${argsToTemplate(args)}></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    `,
  }),
};
export default meta;

export const Default = {};
