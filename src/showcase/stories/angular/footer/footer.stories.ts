import { SbbSecondaryButtonLink } from '@sbb-esta/lyne-angular/button/secondary-button-link';
import { SbbClock } from '@sbb-esta/lyne-angular/clock';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbFooter } from '@sbb-esta/lyne-angular/footer';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkList } from '@sbb-esta/lyne-angular/link-list/link-list';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const variant: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'clock-columns'],
};

const argTypes: ArgTypes = {
  variant,
};

const args: Args = {
  variant: variant.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbSecondaryButtonLink, SbbBlockLink, SbbClock, SbbDivider, SbbLinkList, SbbTitle],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  title: 'elements/sbb-footer',
  component: SbbFooter,
  argTypes,
  args,
};
export default meta;

export const Default = {
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-footer ${spreadArgs(args)}>
        <sbb-link-list horizontal-from="large" [negative]=${args['negative']}>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Refunds
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Lost property office
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Complaints
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Praise
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Report property damage
          </sbb-block-link>
        </sbb-link-list>
      </sbb-footer>
    `,
  }),
};

export const ClockColumns = {
  args: { variant: variant.options![1] },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-footer ${spreadArgs(args)}>
        <div class="sbb-link-list-button-group">
          <sbb-link-list title-level="2" title-content="Help &amp; Contact." [negative]=${args['negative']}>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              negative=${args['negative']}
            >
              Refunds
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              negative=${args['negative']}
            >
              Lost property office
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              negative=${args['negative']}
            >
              Complaints
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              negative=${args['negative']}
            >
              Praise
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              negative=${args['negative']}
            >
              Report property damage
            </sbb-block-link>
          </sbb-link-list>
          <sbb-button-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            size="m"
          >
            All help topics
          </sbb-button-link>
        </div>
        <sbb-link-list title-level="2" title-content="More SBB." [negative]=${args['negative']}>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Jobs & careers
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Rail traffic information
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            SBB News
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            SBB Community
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Company
          </sbb-block-link>
        </sbb-link-list>
        <div class="sbb-link-list-button-group">
          <span>
            <sbb-title
              level="2"
              visual-level="5"
              negative=${args['negative']}
              style="margin: 0 0 var(--sbb-spacing-fixed-3x);"
            >
              Newsletter.
            </sbb-title>
            <p style="margin: 0;">
              Our newsletter regularly informs you of attractive offers from SBB via e-mail.
            </p>
          </span>
          <sbb-secondary-button-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            size="m"
          >
            Subscribe
          </sbb-secondary-button-link>
        </div>
        <sbb-clock></sbb-clock>
        <sbb-divider negative=${args['negative']}></sbb-divider>
        <sbb-link-list horizontal-from="large" [negative]=${args['negative']}>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Refunds
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Lost property office
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Complaints
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Praise
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            negative=${args['negative']}
          >
            Report property damage
          </sbb-block-link>
        </sbb-link-list>
      </sbb-footer>
    `,
  }),
};
