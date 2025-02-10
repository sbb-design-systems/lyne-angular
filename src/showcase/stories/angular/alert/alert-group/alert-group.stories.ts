import { SbbAlert } from '@sbb-esta/lyne-angular/alert/alert';
import { SbbAlertGroup } from '@sbb-esta/lyne-angular/alert/alert-group';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../../tools/spread-args';

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
  // render via template is needed due to the directive implementation
  render: ({ ...args }) => ({
    props: { ...args },
    template: `
      <sbb-alert-group ${spreadArgs(args)}>
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
