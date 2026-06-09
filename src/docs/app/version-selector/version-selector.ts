import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Meta } from '@angular/platform-browser';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

@Component({
  selector: 'sbb-version-selector',
  imports: [FormField, SbbFormField, SbbSelectModule],
  styleUrl: './version-selector.scss',
  templateUrl: './version-selector.html',
})
export class VersionSelectorComponent {
  protected version =
    inject(Meta).getTag('name="sbb-lyne-angular-version"')?.content ?? 'unknown version';
  protected legacyVersions = this.#getLegacyVersions();

  // 0 is considered the current version
  protected versionForm = form(signal(0));

  constructor() {
    effect(() => this.#navigateToLegacyVersion(this.versionForm().value()));
  }

  /**
   * Reads the legacy version list from a meta tag. Expected format is comma-separated list of versions (e.g. "22, 21, ...")
   */
  #getLegacyVersions(): number[] {
    const meta = inject(Meta).getTag('name="sbb-lyne-angular-legacy-versions"')?.content ?? '';

    return meta
      .split(',')
      .map(Number)
      .filter(Number.isInteger)
      .filter((v) => v)
      .sort((a, b) => b - a);
  }

  async #navigateToLegacyVersion(version: number): Promise<void> {
    if (!version) {
      return;
    }
    window.location.href = `https://lyne-angular-v${version}.app.sbb.ch/`;
  }
}
