import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

declare global {
  interface Window {
    LEGACY_VERSIONS?: string; // set by CI/CD
  }
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
