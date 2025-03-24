import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbFormFieldClear } from '@sbb-esta/lyne-angular/form-field/form-field-clear';
import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMapContainer } from '@sbb-esta/lyne-angular/map-container';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbFormField,
        SbbIcon,
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
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-header expanded>
        <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
          Menu
        </sbb-header-button>
        <div class="sbb-header-spacer"></div>
        <sbb-logo protective-room="none" class="sbb-header-logo"></sbb-logo>
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
                  <div style="background-color: var(--sbb-color-milk); height: 116px; display: flex; align-items: center; justify-content: center; border-radius: var(--sbb-border-radius-4x); margin-block-end: var(--sbb-spacing-fixed-4x);">
                    <p>Situation ${value}</p>
                  </div>
                `,
            )
            .join('')}
        </div>

        <div slot="map" style="height: 100%">
          <div style="background-color: grey; height: 100%; display: flex; align-items: center; justify-content: center;">
            map
          </div>
        </div>
      </sbb-map-container>
    `,
  }),
};
export default meta;

export const Default = {};
