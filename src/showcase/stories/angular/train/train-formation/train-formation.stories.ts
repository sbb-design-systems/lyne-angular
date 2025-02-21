import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbTrain } from '@sbb-esta/lyne-angular/train/train';
import { SbbTrainBlockedPassage } from '@sbb-esta/lyne-angular/train/train-blocked-passage';
import { SbbTrainFormation } from '@sbb-esta/lyne-angular/train/train-formation';
import { SbbTrainWagon } from '@sbb-esta/lyne-angular/train/train-wagon';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['side', 'top'],
};

const argTypes: ArgTypes = {
  view,
};

const args: Args = {
  view: view.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbTrain, SbbTrainWagon, SbbTrainBlockedPassage, SbbIcon],
    }),
  ],
  title: 'elements/timetable/sbb-train-formation',
  component: SbbTrainFormation,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-train-formation ${spreadArgs(args)}>
        <sbb-train
          direction-label="Direction of travel"
          station="Bern"
          direction="left"
          accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
        >
          <sbb-train-wagon
            type="locomotive"
            additional-accessibility-text="Top of the train"
            sector="A"
          ></sbb-train-wagon>
          <sbb-train-wagon type="closed" sector="A" label="37"></sbb-train-wagon>
          <sbb-train-blocked-passage></sbb-train-blocked-passage>
          <sbb-train-wagon
            type="wagon"
            label="38"
            occupancy="low"
            blocked-passage="previous"
            wagon-class="1"
            sector="A"
          >
            <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
            <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
            <sbb-icon
              aria-hidden="false"
              aria-label="Business zone in 1st class: Reservation possible"
              name="sa-bz"
            ></sbb-icon>
            <sbb-icon
              aria-hidden="false"
              aria-label="Business zone in 1st class: Reservation possible"
              name="sa-bz"
            ></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-wagon type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
            <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-wagon type="restaurant" label="40" sector="B">
            <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-wagon type="wagon" label="41" occupancy="high" wagon-class="2" sector="B">
            <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="42"
            occupancy="low"
            wagon-class="2"
            blocked-passage="next"
            sector="C"
          >
            <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-blocked-passage></sbb-train-blocked-passage>
          <sbb-train-wagon
            type="wagon"
            label="43"
            occupancy="low"
            wagon-class="2"
            blocked-passage="both"
            sector="C"
          >
            <sbb-icon
              aria-hidden="false"
              aria-label="stroller space"
              name="sa-abteilkinderwagen"
            ></sbb-icon>
            <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-blocked-passage></sbb-train-blocked-passage>
          <sbb-train-wagon
            blocked-passage="previous"
            type="wagon"
            label="44"
            occupancy="low"
            wagon-class="2"
            sector="C"
          >
            <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
            <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
          </sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="45"
            occupancy="low"
            wagon-class="2"
            sector="D"
          ></sbb-train-wagon>
          <sbb-train-wagon type="couchette" label="46" sector="D"></sbb-train-wagon>
          <sbb-train-wagon
            type="sleeping"
            label="47"
            additional-accessibility-text="End of the train"
            sector="D"
            blocked-passage="next"
          ></sbb-train-wagon>
          <sbb-train-blocked-passage></sbb-train-blocked-passage>
        </sbb-train>
        <sbb-train
          direction-label="Direction of travel"
          station="Luzern"
          direction="left"
          accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction"
        >
          <sbb-train-wagon
            type="wagon-end-left"
            additional-accessibility-text="Top of the train"
            blocked-passage="previous"
            occupancy="none"
            wagon-class="2"
            sector="E"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="50"
            occupancy="low"
            wagon-class="2"
            sector="E"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="51"
            occupancy="low"
            wagon-class="2"
            sector="F"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="52"
            occupancy="low"
            wagon-class="2"
            sector="F"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="53"
            occupancy="low"
            wagon-class="2"
            sector="F"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="54"
            occupancy="low"
            wagon-class="2"
            sector="G"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="55"
            occupancy="low"
            wagon-class="2"
            sector="G"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="56"
            occupancy="low"
            wagon-class="2"
            sector="G"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="57"
            occupancy="low"
            wagon-class="2"
            sector="H"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon"
            label="58"
            occupancy="low"
            wagon-class="2"
            sector="H"
          ></sbb-train-wagon>
          <sbb-train-wagon
            type="wagon-end-right"
            label="59"
            occupancy="low"
            wagon-class="2"
            sector="H"
          ></sbb-train-wagon>
        </sbb-train>
      </sbb-train-formation>
    `,
  }),
};
export default meta;

export const Default = {};
