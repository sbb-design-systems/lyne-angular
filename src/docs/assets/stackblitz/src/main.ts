import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { SbbAngularDocsExample } from './app/sbb-angular-docs-example';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(SbbAngularDocsExample, {
  providers: [provideHttpClient(), provideRouter([]), provideZonelessChangeDetection()],
}).catch((err) => console.error(err));
