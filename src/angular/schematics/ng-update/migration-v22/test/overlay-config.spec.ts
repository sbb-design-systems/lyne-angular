import { describe, expect, it } from 'vitest';

import { OverlayConfigMigration } from '../overlay-config.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-overlay-config`, () => {
  it('should ignore SbbOverlayConfig when used inside import specifiers', () => {
    const mockInput = `
import { Component } from '@angular/core';
import { SbbOverlayConfig } from '@sbb-esta/lyne-angular/overlay';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent {}
`.trim();

    const result = testMigration(OverlayConfigMigration, 'ts', mockInput);
    expect(result).toBe(mockInput);
  });

  it('should inject multiline comments above a type reference property assignment', () => {
    const mockInput = `
import { Component } from '@angular/core';
import { SbbOverlayConfig } from '@sbb-esta/lyne-angular/overlay';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent {
  myConfig: SbbOverlayConfig;
}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';
import { SbbOverlayConfig } from '@sbb-esta/lyne-angular/overlay';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent {
  // FIXME: the usage of \`SbbOverlayConfig\` has been changed.
  //  If you are using it to open a \`SbbOverlay\`, you have to adapt your import to \`@sbb-esta/lyne-angular/overlay\`.
  //  If you are using it to open a \`SbbDialog\`, change it to \`SbbDialogConfig\` and adapt your import to \`@sbb-esta/lyne-angular/dialog\`.
  //  If you are using it to open a \`SbbToast\`, change it to \`SbbToastConfig\` and adapt your import to \`@sbb-esta/lyne-angular/toast\`.
  myConfig: SbbOverlayConfig;
}
`.trim();

    const result = testMigration(OverlayConfigMigration, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should inject multiline comments above an instantiation expression', () => {
    const mockInput = `
export class ConfigurationFactory {
  build() {
    const defaultOptions = new SbbOverlayConfig();
    return defaultOptions;
  }
}
`.trim();

    const mockOutput = `
export class ConfigurationFactory {
  build() {
    // FIXME: the usage of \`SbbOverlayConfig\` has been changed.
    //  If you are using it to open a \`SbbOverlay\`, you have to adapt your import to \`@sbb-esta/lyne-angular/overlay\`.
    //  If you are using it to open a \`SbbDialog\`, change it to \`SbbDialogConfig\` and adapt your import to \`@sbb-esta/lyne-angular/dialog\`.
    //  If you are using it to open a \`SbbToast\`, change it to \`SbbToastConfig\` and adapt your import to \`@sbb-esta/lyne-angular/toast\`.
    const defaultOptions = new SbbOverlayConfig();
    return defaultOptions;
  }
}
`.trim();

    const result = testMigration(OverlayConfigMigration, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should have multiple FIXME for multiple usages', () => {
    const mockInput = `
import { Component } from '@angular/core';
import { SbbOverlayConfig } from '@sbb-esta/lyne-angular/overlay';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent implements OnInit {
  dialogService = inject(SbbDialogService);
  toastService = inject(SbbToastService);
  dialogConfig: SbbOverlayConfig;
  toastConfig: SbbOverlayConfig;
  templateContent = viewChild.required('template', { read: TemplateRef });

  ngOnInit() {
    this.dialogService.open(templateContent, dialogConfig);
    this.toastConfig.open(templateContent, toastConfig);
  }
}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';
import { SbbOverlayConfig } from '@sbb-esta/lyne-angular/overlay';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent implements OnInit {
  dialogService = inject(SbbDialogService);
  toastService = inject(SbbToastService);
  // FIXME: the usage of \`SbbOverlayConfig\` has been changed.
  //  If you are using it to open a \`SbbOverlay\`, you have to adapt your import to \`@sbb-esta/lyne-angular/overlay\`.
  //  If you are using it to open a \`SbbDialog\`, change it to \`SbbDialogConfig\` and adapt your import to \`@sbb-esta/lyne-angular/dialog\`.
  //  If you are using it to open a \`SbbToast\`, change it to \`SbbToastConfig\` and adapt your import to \`@sbb-esta/lyne-angular/toast\`.
  dialogConfig: SbbOverlayConfig;
  // FIXME: the usage of \`SbbOverlayConfig\` has been changed.
  //  If you are using it to open a \`SbbOverlay\`, you have to adapt your import to \`@sbb-esta/lyne-angular/overlay\`.
  //  If you are using it to open a \`SbbDialog\`, change it to \`SbbDialogConfig\` and adapt your import to \`@sbb-esta/lyne-angular/dialog\`.
  //  If you are using it to open a \`SbbToast\`, change it to \`SbbToastConfig\` and adapt your import to \`@sbb-esta/lyne-angular/toast\`.
  toastConfig: SbbOverlayConfig;
  templateContent = viewChild.required('template', { read: TemplateRef });

  ngOnInit() {
    this.dialogService.open(templateContent, dialogConfig);
    this.toastConfig.open(templateContent, toastConfig);
  }
}
`.trim();

    const result = testMigration(OverlayConfigMigration, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });
});
