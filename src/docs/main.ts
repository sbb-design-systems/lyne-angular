import { bootstrapApplication } from '@angular/platform-browser';
import { mergeConfig } from '@sbb-esta/lyne-elements/core.js';

import { App } from './app/app';
import { appConfig } from './app/app.config';

mergeConfig({
  icon: {
    namespaces: new Map<string, string>()
      .set('kom', 'https://icons.app.sbb.ch/icons/')
      .set('fpl', 'https://icons.app.sbb.ch/icons/'),
  },
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
