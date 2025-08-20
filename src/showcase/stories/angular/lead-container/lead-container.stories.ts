import { SbbAlert, SbbAlertGroup } from '@sbb-esta/lyne-angular/alert';
import { SbbBreadcrumb } from '@sbb-esta/lyne-angular/breadcrumb/breadcrumb';
import { SbbBreadcrumbGroup } from '@sbb-esta/lyne-angular/breadcrumb/breadcrumb-group';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbLeadContainer } from '@sbb-esta/lyne-angular/lead-container';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbNotification } from '@sbb-esta/lyne-angular/notification';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbAlert,
        SbbAlertGroup,
        SbbBlockLink,
        SbbBreadcrumb,
        SbbBreadcrumbGroup,
        SbbLink,
        SbbImage,
        SbbNotification,
        SbbTitle,
      ],
    }),
  ],
  title: 'elements/sbb-lead-container',
  component: SbbLeadContainer,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
    <sbb-lead-container>
      <style>
        p.other-content {
          margin-block: 0;
        }
      </style>
      <sbb-alert-group class="sbb-lead-container-spacing">
        <sbb-alert size="m">
          <sbb-title>Interruption between Genève and Lausanne</sbb-title>
          The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>
      </sbb-alert-group>
      <sbb-breadcrumb-group class="sbb-lead-container-spacing">
        <sbb-breadcrumb href="#" iconName="house-small" id="breadcrumb-0"></sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 2</sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 3</sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 4</sbb-breadcrumb>
      </sbb-breadcrumb-group>
      <sbb-block-link
        iconPlacement="start"
        iconName="chevron-small-left-small"
        size="xs"
        href="https://www.sbb.ch"
        class="sbb-lead-container-spacing"
      >
        Link
      </sbb-block-link>
      <sbb-title class="sbb-lead-container-spacing">Title</sbb-title>
      <p class="sbb-text-xl sbb-lead-container-lead-text">
        Lead text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies
        in tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit
        risus.
      </p>
      <sbb-notification type="info" class="sbb-lead-container-spacing">
        Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at
        augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac, mollis efficitur
        lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat metus.
      </sbb-notification>
      <p class="sbb-text-m other-content">
        Other content. Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula.
        Suspendisse at augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac, mollis
        efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat metus.
      </p>
      <sbb-image
        slot="image"
        imageSrc='https://cdn.img.sbb.ch/content/dam/internet/lyne/Einheitswagen-IV-EuroCity.jpg'
        alt="Station of Lucerne from outside"
      ></sbb-image>
    </sbb-lead-container>
    `,
  }),
};
export default meta;

export const Default = {};
