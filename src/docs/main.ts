import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { LyneAngularShowcaseComponent } from './app/lyne-angular-showcase';

bootstrapApplication(LyneAngularShowcaseComponent, appConfig).catch((err) => console.error(err));
