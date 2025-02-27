import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Meta, moduleMetadata } from '@storybook/angular';

const ListContent = (): string => `
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
  <li>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
    <p>Other paragraph.</p>
  </li>
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
`;

const UnorderedListTemplate = (): string => `
  ${['xs', 's', 'm', 'l', 'xl']
    .map(
      (textSize) => `
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ul class=${`sbb-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ul>
            ${ListContent()}
          </ul>
        </li>
      </ul>
    `,
    )
    .join('')}
`;

const OrderedListTemplate = (): string => `
  ${['xs', 's', 'm', 'l', 'xl']
    .map(
      (textSize) => `
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ol>
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
    )
    .join('')}
`;

const StepListTemplate = (): string => `
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => `
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-step-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
  )}
`;

const IconListTemplate = (): string => `
  ${['xs', 's', 'm', 'l', 'xl']
    .map(
      (textSize) => `
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-icon-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
    )
    .join('')}
`;

const IconListCustomIconTemplate = (): string => `
  ${['xs', 's', 'm', 'l', 'xl']
    .map(
      (textSize) => `
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol
        class=${`sbb-icon-list sbb-text-${textSize}`}
        style="--sbb-icon-list-marker-icon-color: var(--sbb-color-red); --sbb-icon-list-marker-icon: url('https://icons.app.sbb.ch/icons/circle-cross-small.svg')"
      >
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
    )
    .join('')}
`;

const IconListCustomColorTemplate = (): string => `
  ${['xs', 's', 'm', 'l', 'xl']
    .map(
      (textSize) => `
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-icon-list sbb-text-${textSize}`} style="color: var(--sbb-color-green);">
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
    )
    .join('')}
`;

const DescriptionListTemplate = (): string => `
  <dl class="sbb-list">
    <dt>Label:</dt>
    <dd>Description of the label.</dd>

    <dt>Longer Label:</dt>
    <dd>Description of the label which is longer than the other one.</dd>

    <dt>A very very very long label:</dt>
    <dd>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
      ipsum dolor sit amet.
    </dd>
  </dl>
`;

export const UnorderedList = {
  render: () => ({
    template: UnorderedListTemplate(),
  }),
};

export const OrderedList = {
  render: () => ({
    template: OrderedListTemplate(),
  }),
};

export const StepList = {
  render: () => ({
    template: StepListTemplate(),
  }),
};

export const IconList = {
  render: () => ({
    template: IconListTemplate(),
  }),
};
export const IconListCustomIcon = {
  render: () => ({
    template: IconListCustomIconTemplate(),
  }),
};

export const IconListCustomColor = {
  render: () => ({
    template: IconListCustomColorTemplate(),
  }),
};

export const DescriptionList = {
  render: () => ({
    template: DescriptionListTemplate(),
  }),
};

const meta: Meta = {
  title: 'styles/list',
  decorators: [
    moduleMetadata({
      imports: [SbbTitle],
    }),
  ],
};

export default meta;
