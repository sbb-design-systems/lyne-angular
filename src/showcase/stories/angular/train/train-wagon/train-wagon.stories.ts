import { SbbTrainWagon } from '@sbb-esta/lyne-angular/train';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const withIcons: InputType = {
  control: {
    type: 'boolean',
  },
};
const occupancy: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['high', 'medium', 'low', 'none', null],
};

const type: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [
    'wagon',
    'wagon-end-left',
    'wagon-end-right',
    'couchette',
    'sleeping',
    'restaurant',
    'locomotive',
    'closed',
  ],
};

const wagonClass: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', null],
};

const argTypes: ArgTypes = {
  withIcons,
  occupancy,
  type,
  wagonClass,
};

const args: Args = {
  withIcons: false,
  label: '36',
  occupancy: occupancy.options![2],
  type: type.options![0],
  wagonClass: wagonClass.options![1],
};

const meta: Meta = {
  title: 'elements/timetable/sbb-train-wagon',
  component: SbbTrainWagon,
  argTypes,
  args,
  render: ({ withIcons, wagonClass, occupancy, ...args }: Args) => ({
    props: { withIcons, wagonClass, occupancy, ...args },
    template: `
      <sbb-train-formation>
        <sbb-train>
          <sbb-train-wagon
            ${occupancy ? `[occupancy]="occupancy"` : ''}
            ${wagonClass ? `[wagonClass]="wagonClass"` : ''}
            ${argsToTemplate(args)}
          >
          ${
            withIcons
              ? `
              <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
              <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
              <sbb-icon
                aria-hidden="false"
                aria-label="Business zone in 1st class: Reservation possible"
                name="sa-bz"
              ></sbb-icon>
            `
              : ''
          }
          </sbb-train-wagon>
        </sbb-train>
      </sbb-train-formation>
    `,
  }),
};
export default meta;

export const Default = {};
