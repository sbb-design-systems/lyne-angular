import { TitleCasePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

const CATEGORIES = {
  trains: {
    iconName: 'train-small',
    entries: [
      {
        title: 'Glacier Express',
        description: 'Panoramic journey through the Swiss Alps from St. Moritz to Zermatt.',
      },
      {
        title: 'Gotthard Panorama Express',
        description: 'Scenic route crossing the historic Gotthard railway.',
      },
      {
        title: 'Golden Pass Express',
        description: 'Connecting Lucerne and Montreux through the Swiss heartland.',
      },
    ],
  },
  buses: {
    iconName: 'bus-stop-small',
    entries: [
      {
        title: 'Zurich Airport Bus',
        description: 'Direct express bus link between Zurich city center and the airport.',
      },
      {
        title: 'PostAuto Alpine Route',
        description: 'Spectacular mountain pass bus connections through the Bernese Oberland.',
      },
    ],
  },
  boats: {
    iconName: 'boat-small',
    entries: [
      {
        title: 'Lake Geneva Ferry',
        description: 'Scenic ferry crossing Lake Geneva between Lausanne and Evian-les-Bains.',
      },
      {
        title: 'Lake Lucerne Steamboat',
        description: 'Historic paddle steamers cruising the picturesque Lake Lucerne.',
      },
    ],
  },
};

/**
 * @title tag-group filter
 * @order 3
 */
@Component({
  selector: 'sbb-tag-all-filter-example',
  templateUrl: 'tag-all-filter-example.html',
  styleUrl: 'tag-all-filter-example.scss',
  imports: [SbbCardModule, SbbTagModule, SbbTitleModule, FormField, TitleCasePipe],
})
export class TagAllFilterExample {
  protected readonly categories = Object.entries(CATEGORIES).map(([key, value]) => ({
    name: key as keyof typeof CATEGORIES,
    iconName: value.iconName,
    entries: value.entries,
  }));

  protected readonly filterForm = form(
    signal<Record<keyof typeof CATEGORIES | 'all', boolean>>({
      all: true,
      trains: false,
      buses: false,
      boats: false,
    }),
  );

  protected readonly filteredEntries = computed(() => {
    return (
      this.filterForm.all().value()
        ? this.categories
        : this.categories.filter((entry) => this.filterForm[entry.name]().value())
    ).flatMap((e) => e.entries);
  });

  constructor() {
    effect(() => {
      // Sync `all` tag depending on other tags
      this.filterForm
        .all()
        .value.set(!this.categories.some((entry) => this.filterForm[entry.name]().value()));
    });
  }

  protected allTagChanged() {
    // Sync tags to `all` tag
    this.categories.forEach((entry) =>
      this.filterForm[entry.name]().value.set(!this.filterForm.all().value()),
    );
  }
}
