import * as tokens from '@sbb-esta/lyne-design-tokens';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';

import docJson from './documentation.json';
setCompodocJson(docJson);

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
    },
    viewport: { viewports: storybookViewports },
    backgrounds: { disable: true },
  },
};

export default preview;
