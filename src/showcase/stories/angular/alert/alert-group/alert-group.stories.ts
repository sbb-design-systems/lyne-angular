import { SbbAlert } from '@sbb-esta/lyne-angular/alert/alert';
import { SbbAlertGroup } from '@sbb-esta/lyne-angular/alert/alert-group';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const accessibilityTitleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const ariaLive: InputType = {
  control: {
    type: 'select',
  },
  options: ['off', 'polite', 'assertive'],
};

const role: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  'accessibility-title-level': accessibilityTitleLevel,
  'aria-live': ariaLive,
  role,
};

const args: Args = {
  'accessibility-title-level': accessibilityTitleLevel.options![1],
  'aria-live': undefined,
  role: 'status',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbAlert, SbbLink],
    }),
  ],
  title: 'elements/sbb-alert/sbb-alert-group',
  component: SbbAlertGroup,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-alert-group ${argsToTemplate(args)}>
        <sbb-alert title-content="Interruption between Genève and Lausanne" size="l">
          The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>
        <sbb-alert title-content="Interruption between Berne and Olten">
          Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
          construction work will take place. You have to expect changed travel times and changed
          connections. <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>
      </sbb-alert-group>
    `,
  }),
};
export default meta;

export const Default = {};
