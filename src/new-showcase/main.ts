import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { NewShowcaseComponent } from './app/new-showcase';

bootstrapApplication(NewShowcaseComponent, appConfig).catch((err) => console.error(err));
