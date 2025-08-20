import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox/checkbox-panel';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';
import { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';
import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button/radio-button';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button/radio-button-group';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { SbbTableWrapper } from '@sbb-esta/lyne-angular/table/table-wrapper';
import type { Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export const leanExample = {};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbActionGroup,
        SbbButton,
        SbbSecondaryButton,
        SbbCardBadge,
        SbbCheckboxPanel,
        SbbContainer,
        SbbHeader,
        SbbHeaderButton,
        SbbHeaderLink,
        SbbFormField,
        SbbIcon,
        SbbMenu,
        SbbMenuButton,
        SbbOption,
        SbbPaginator,
        SbbRadioButtonGroup,
        SbbRadioButton,
        SbbSignet,
        SbbSelect,
        SbbTableWrapper,
      ],
    }),
  ],
  parameters: {
    isLean: true,
    layout: 'fullscreen',
  },
  title: 'pages/lean',
  render: () => ({
    template: `
      <sbb-header hide-on-scroll expanded>
        <sbb-header-button iconName="hamburger-menu-small" expandFrom="small">
          Menu
        </sbb-header-button>
        <div class="sbb-header-spacer"></div>
        <sbb-header-link iconName="magnifying-glass-small" href="/"> Search </sbb-header-link>
        <sbb-header-button iconName="user-small" class="sbb-header-shrinkable">
          Sign in
        </sbb-header-button>
        <sbb-header-button iconName="globe-small" id="language-menu-trigger" class="last-element">
          English
        </sbb-header-button>
        <sbb-menu trigger="language-menu-trigger">
          <sbb-menu-button aria-pressed="false">Deutsch</sbb-menu-button>
          <sbb-menu-button aria-pressed="false">Français</sbb-menu-button>
          <sbb-menu-button aria-pressed="false">Italiano</sbb-menu-button>
          <sbb-menu-button iconName="tick-small" aria-pressed="true"> English </sbb-menu-button>
        </sbb-menu>
        <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
        <a aria-label="Homepage" href="/" class="sbb-header-logo">
          <sbb-signet protectiveRoom="panel"></sbb-signet>
        </a>
      </sbb-header>

      <sbb-container expanded>
        <section class="lean-section">
          <div class="lean-wrapper">
            <sbb-form-field>
              <label>Departure</label>
              <sbb-select>
                <sbb-option value="1" selected>Zug</sbb-option>
                <sbb-option value="2">Lucerne</sbb-option>
                <sbb-option value="3">Fribourg</sbb-option>
              </sbb-select>
            </sbb-form-field>
            <sbb-form-field>
              <label>Arrival</label>
              <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
              <input />
              <sbb-icon slot="suffix" name="circle-question-mark-small"></sbb-icon>
            </sbb-form-field>
            <sbb-action-group>
              <sbb-secondary-button>Clear departure</sbb-secondary-button>
              <sbb-button>Search</sbb-button>
            </sbb-action-group>
          </div>
        </section>
        <section class="lean-section">
          <div class="lean-wrapper-half">
            <sbb-table-wrapper>
              <table class="sbb-table sbb-table--striped">
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bern</td>
                    <td>9:00</td>
                    <td>10:00</td>
                  </tr>
                  <tr>
                    <td>Zurich</td>
                    <td>9:15</td>
                    <td>10:15</td>
                  </tr>
                  <tr>
                    <td>Basel</td>
                    <td>9.45</td>
                    <td>10.45</td>
                  </tr>
                  <tr>
                    <td>Geneva</td>
                    <td>10:00</td>
                    <td>11:00</td>
                  </tr>
                  <tr>
                    <td>Lausanne</td>
                    <td>10:30</td>
                    <td>11:30</td>
                  </tr>
                  <tr>
                    <td>Bellinzona</td>
                    <td>11:00</td>
                    <td>12:00</td>
                  </tr>
                </tbody>
              </table>
            </sbb-table-wrapper>
            <sbb-paginator page-size="10" length="100"></sbb-paginator>
          </div>
          <div class="lean-wrapper-half">
            <sbb-radio-button-group orientation="vertical" horizontalFrom="small">
              <sbb-radio-button value="Value one">Value one</sbb-radio-button>
              <sbb-radio-button value="Value two">Value two</sbb-radio-button>
              <sbb-radio-button value="Value three" disabled> Value three </sbb-radio-button>
              <sbb-radio-button value="Value four">Value four</sbb-radio-button>
            </sbb-radio-button-group>
            <sbb-checkbox-panel>
              Label
              <span slot="subtext">Subtext</span>
              <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
                <sbb-icon
                  name="diamond-small"
                  style="margin-inline: var(--sbb-spacing-fixed-2x);"
                  data-namespace="default"
                  role="img"
                  aria-hidden="true"
                ></sbb-icon>
                <span class="sbb-text-m sbb-text--bold"> CHF 40.00 </span>
              </span>
              <sbb-card-badge>%</sbb-card-badge>
            </sbb-checkbox-panel>
          </div>
        </section>
      </sbb-container>
    `,
  }),
};

export default meta;
