import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../../tools/spread-args';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbAutocompleteGridRow],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-option',
  component: SbbAutocompleteGridOption,
  render: (args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='1' ${spreadArgs(args)}>1</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='2' ${spreadArgs(args)}>2</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='3' ${spreadArgs(args)}>3</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
    `,
  }),
};
export default meta;

export const Default = {};
