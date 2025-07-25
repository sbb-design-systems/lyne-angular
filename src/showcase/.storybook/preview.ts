import * as tokens from '@sbb-esta/lyne-design-tokens';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';
import type { StoryContext } from 'storybook/internal/types';
import { makeDecorator } from 'storybook/preview-api';

import docJson from './documentation.json';

// FIXME
//  compodoc has no parameter in the config to exclude methods and outputs from controls
//  so they have to be manually removed
//  https://github.com/storybookjs/storybook/issues/15906
for (const directive of docJson.directives) {
  directive.outputsClass = [];
  directive.methodsClass = [];
  directive.propertiesClass = [];
}
setCompodocJson(docJson);

/**
 * The Lean design is applied by adding the 'sbb-lean' class to the document.
 */
const withLeanDecorator = makeDecorator({
  name: 'withLeanStyle',
  parameterName: 'isLean',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const isLean = parameters as unknown as boolean;

    if (isLean) {
      document.documentElement.classList.add('sbb-lean');
    } else {
      document.documentElement.classList.remove('sbb-lean');
    }

    return getStory(context);
  },
});

const withBackgroundDecorator = makeDecorator({
  name: 'withContextSpecificBackgroundColor',
  parameterName: 'backgroundColor',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const backgroundColor = parameters as (context: StoryContext) => string;

    const rootElement = (context.canvasElement as unknown as HTMLElement).closest<HTMLElement>(
      '.docs-story, .sb-show-main',
    )!;

    // If no background function is set, remove background color.
    if (!backgroundColor) {
      rootElement.style.removeProperty('background-color');
    } else {
      rootElement.style.backgroundColor = backgroundColor(context);
    }

    return getStory(context);
  },
});

const getViewportName = (key: string): string =>
  key.replace(/(^SbbBreakpoint|Min$)/g, '').toLowerCase();

const breakpoints = Object.entries(tokens)
  .filter(([key]) => key.startsWith('SbbBreakpoint') && key.endsWith('Min'))
  .map(([key, value]) => ({ key: getViewportName(key), value: value as number }))
  .sort((a, b) => a.value - b.value);

const breakpointNames: Record<string, number> = breakpoints.reduce(
  (current, next) => Object.assign(current, { [next.key]: next.value }),
  {} as Record<string, number>,
);

const storybookViewports = breakpoints.reduce(
  (current, next) =>
    Object.assign(current, {
      [next.key]: {
        name: `Breakpoint ${next.key}`,
        styles: {
          width: `${next.value || 320}px`,
          height: '',
        },
      },
    }),
  {} as Record<string, number>,
);

const preview: Preview = {
  decorators: [withBackgroundDecorator, withLeanDecorator],
  tags: ['autodocs'],
  parameters: {
    breakpoints: {
      breakpointNames,
      debounceTimeout: 10,
    },
    docs: {
      toc: {
        ignoreSelector: '.docs-story h2',
        headingSelector: 'h2',
      },
      source: { format: 'html' },
      description: {
        component:
          'For documentation and API, check the Lyne Elements Storybook on [https://lyne-storybook.app.sbb.ch](https://lyne-storybook.app.sbb.ch).',
      },
    },
    viewport: { viewports: storybookViewports },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ['introduction', 'pages', 'elements', 'experimental', 'styles', 'internals'],
      },
    },
  },
};

export default preview;
