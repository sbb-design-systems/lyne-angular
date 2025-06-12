import { SbbAutocompleteGridButton } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  negative,
  disabled,
};

const args: Args = {
  negative: false,
  disabled: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbAutocompleteGridButton, SbbAutocompleteGridRow],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-cell',
  component: SbbAutocompleteGridCell,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-row ${args['negative'] ? 'data-negative' : ''}>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button ${argsToTemplate(args)} iconName='star-small'></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button ${argsToTemplate(args)} iconName='pen-small'></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button ${argsToTemplate(args)} iconName='trash-small'></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    `,
  }),
};
export default meta;

export const Default = {};
