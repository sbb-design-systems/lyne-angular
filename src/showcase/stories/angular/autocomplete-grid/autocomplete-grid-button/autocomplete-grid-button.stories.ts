import {
  SbbAutocompleteGridButton,
  SbbAutocompleteGridCell,
  SbbAutocompleteGridRow,
} from '@sbb-esta/lyne-angular/autocomplete-grid';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { InputType, StoryContext } from 'storybook/internal/types';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

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
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  argTypes: {
    ariaLabel,
  },
  args: {
    ariaLabel: 'arrow-right-small',
    iconName: 'arrow-right-small',
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
