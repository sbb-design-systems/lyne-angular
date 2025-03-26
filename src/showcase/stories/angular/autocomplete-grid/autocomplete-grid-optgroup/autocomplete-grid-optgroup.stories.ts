import { SbbAutocompleteGridButton } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridOptgroup } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-optgroup';
import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { StoryContext } from '@storybook/types';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbAutocompleteGridOption,
        SbbAutocompleteGridRow,
        SbbAutocompleteGridCell,
        SbbAutocompleteGridButton,
      ],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-optgroup',
  component: SbbAutocompleteGridOptgroup,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  args: {
    label: 'Option group',
    disabled: false,
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-optgroup label="${args['label']} 1" disabled=${args['disabled']}>
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option value="1">1</sbb-autocomplete-grid-option>
          <sbb-autocomplete-grid-cell>
            <sbb-autocomplete-grid-button iconName="pie-small"></sbb-autocomplete-grid-button>
          </sbb-autocomplete-grid-cell>
        </sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option value="2">2</sbb-autocomplete-grid-option>
          <sbb-autocomplete-grid-cell>
            <sbb-autocomplete-grid-button iconName="star-small"></sbb-autocomplete-grid-button>
          </sbb-autocomplete-grid-cell>
        </sbb-autocomplete-grid-row>
        </sbb-autocomplete-grid-optgroup>
        <sbb-autocomplete-grid-optgroup label="${args['label']} 2">
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option value="3">3</sbb-autocomplete-grid-option>
            <sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-button iconName="dog-small"></sbb-autocomplete-grid-button>
            </sbb-autocomplete-grid-cell>
          </sbb-autocomplete-grid-row>
        </sbb-autocomplete-grid-optgroup>
    `,
  }),
};
export default meta;

export const Default = {};
