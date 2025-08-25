import { SbbAlert, SbbAlertGroup } from '@sbb-esta/lyne-angular/alert';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

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
  accessibilityTitleLevel,
  'aria-live': ariaLive,
  role,
};

const args: Args = {
  accessibilityTitle: 'Disruptions',
  accessibilityTitleLevel: accessibilityTitleLevel.options![1],
  'aria-live': undefined,
  role: 'status',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbAlert, SbbLink, SbbTitle],
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
        <sbb-alert size="l">
          <sbb-title>Interruption between Genève and Lausanne</sbb-title>
          The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>
        <sbb-alert>
          <sbb-title>Interruption between Berne and Olten</sbb-title>
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
