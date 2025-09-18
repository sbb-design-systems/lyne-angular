import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbFormField, SbbFormFieldClear } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeader, SbbHeaderButton } from '@sbb-esta/lyne-angular/header';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMapContainer } from '@sbb-esta/lyne-angular/map-container';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbFormField,
        SbbIcon,
        SbbCard,
        SbbTitle,
        SbbHeader,
        SbbLogo,
        SbbHeaderButton,
        SbbFormFieldClear,
      ],
    }),
  ],
  title: 'elements/sbb-map-container',
  component: SbbMapContainer,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    hideScrollUpButton: false,
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-header expanded>
        <sbb-header-button iconName="hamburger-menu-small" expandFrom="small">
          Menu
        </sbb-header-button>
        <div class="sbb-header-spacer"></div>
        <sbb-logo protectiveRoom="none" class="sbb-header-logo"></sbb-logo>
      </sbb-header>
      <sbb-map-container ${argsToTemplate(args)}>
        <div style="padding: var(--sbb-spacing-fixed-4x)">
          <sbb-form-field style="width: 100%">
            <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
            <input minlength="2" name="keyword" autocomplete="off" placeholder="Search" />
            <sbb-form-field-clear></sbb-form-field-clear>
          </sbb-form-field>
          <sbb-title level="4">Operations & Disruptions</sbb-title>
          ${[...Array(10).keys()]
            .map(
              (value) => `
                  <sbb-card color="milk" style="margin-block-end: var(--sbb-spacing-fixed-4x);">
                    <p>Situation ${value}</p>
                  </sbb-card>
                `,
            )
            .join('')}
        </div>

        <div slot="map" style="height: 100%">
          <div style="background-color: var(--sbb-background-color-4); height: 100%; display: flex; align-items: center; justify-content: center;">
            map
          </div>
        </div>
      </sbb-map-container>
    `,
  }),
};
export default meta;

export const Default = {};
