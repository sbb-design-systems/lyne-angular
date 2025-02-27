import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { componentWrapperDecorator, Meta, moduleMetadata } from '@storybook/angular';

const PageSpacingTemplate = (): string => `
  <section class="sbb-page-spacing visualized-page-spacing">
    <div>Content</div>
  </section>
`;

const PageSpacingExpandedTemplate = (): string => `
  <section class="sbb-page-spacing-expanded visualized-page-spacing">
    <div>Content</div>
  </section>
`;

const GridContent = (): string =>
  `${new Array(16)
    .fill(undefined)
    .map(() => `<div></div>`)
    .join('')}`;

const Warning = (): string => `
  <span class="sbb-text-s">
    This example only intends to visualize the grid and is not meant to be used as is.
    <br />
    <sbb-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">
      See docs on CSS grid </sbb-link
    >.
  </span>
`;

const GridTemplate = (): string => `
  <div class="sbb-grid visualized-grid">${GridContent()}</div>
  <p class="sbb-page-spacing">${Warning()}</p>
`;

const GridExpandedTemplate = (): string => `
  <div class="sbb-grid-expanded visualized-grid">${GridContent()}</div>
  <p class="sbb-page-spacing-expanded">${Warning()}</p>
`;

export const PageSpacing = {
  render: () => ({
    template: PageSpacingTemplate(),
  }),
};

export const PageSpacingExpanded = {
  render: () => ({
    template: PageSpacingExpandedTemplate(),
  }),
};

export const Grid = {
  render: () => ({
    template: GridTemplate(),
  }),
};

export const GridExpanded = {
  render: () => ({
    template: GridExpandedTemplate(),
  }),
};

const meta: Meta = {
  decorators: [
    componentWrapperDecorator((story) => `<div style="padding-block: 2rem;">${story}</div>`),
    moduleMetadata({
      imports: [SbbLink],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  title: 'styles/layout',
};

export default meta;
