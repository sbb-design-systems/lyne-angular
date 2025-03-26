import { SbbButtonLink } from '@sbb-esta/lyne-angular/button/button-link';
import { SbbSecondaryButtonLink } from '@sbb-esta/lyne-angular/button/secondary-button-link';
import { SbbClock } from '@sbb-esta/lyne-angular/clock';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbFooter } from '@sbb-esta/lyne-angular/footer';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkList } from '@sbb-esta/lyne-angular/link-list/link-list';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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
      imports: [
        SbbButtonLink,
        SbbSecondaryButtonLink,
        SbbBlockLink,
        SbbClock,
        SbbDivider,
        SbbLinkList,
        SbbTitle,
      ],
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
  render: ({ negative, ...args }: Args) => ({
    props: { negative, ...args },
    template: `
      <sbb-footer ${argsToTemplate({ negative, ...args })}>
        <sbb-link-list horizontalFrom="large" [negative]='negative'>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Refunds
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Lost property office
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Complaints
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Praise
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
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
  render: ({ negative, ...args }: Args) => ({
    props: { negative, ...args },
    template: `
      <sbb-footer ${argsToTemplate({ negative, ...args })}>
        <div class="sbb-link-list-button-group">
          <sbb-link-list title-level="2" titleContent="Help &amp; Contact." [negative]='negative'>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              [negative]='negative'
            >
              Refunds
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              [negative]='negative'
            >
              Lost property office
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              [negative]='negative'
            >
              Complaints
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              [negative]='negative'
            >
              Praise
            </sbb-block-link>
            <sbb-block-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              [negative]='negative'
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
        <sbb-link-list titleLevel="2" titleContent="More SBB." [negative]='negative'>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Jobs & careers
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Rail traffic information
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            SBB News
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            SBB Community
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Company
          </sbb-block-link>
        </sbb-link-list>
        <div class="sbb-link-list-button-group">
          <span>
            <sbb-title
              level="2"
              visualLevel="5"
              [negative]='negative'
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
        <sbb-divider [negative]='negative'></sbb-divider>
        <sbb-link-list horizontalFrom="large" [negative]='negative'>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Refunds
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Lost property office
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Complaints
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Praise
          </sbb-block-link>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            [negative]='negative'
          >
            Report property damage
          </sbb-block-link>
        </sbb-link-list>
      </sbb-footer>
    `,
  }),
};
