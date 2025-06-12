import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const version = process.env.STORYBOOK_COMPONENTS_VERSION;
addons.setConfig({
  enableShortcuts: false,
  theme: create({
    base: 'light',
    brandTitle: `lyne-angular${version ? `<br>${version}` : ''}`,
  }),
});
