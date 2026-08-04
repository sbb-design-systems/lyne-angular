import { TitleCasePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbTagModule } from '@sbb-esta/lyne-angular/tag';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

const CATEGORIES = { trains: 'train-small', buses: 'bus-stop-small', boats: 'boat-small' };

const TRAVEL_ENTRIES: {
  title: string;
  description: string;
  category: keyof typeof CATEGORIES;
}[] = [
  {
    title: 'Glacier Express',
    description: 'Panoramic journey through the Swiss Alps from St. Moritz to Zermatt.',
    category: 'trains',
  },
  {
    title: 'Gotthard Panorama Express',
    description: 'Scenic route crossing the historic Gotthard railway.',
    category: 'trains',
  },
  {
    title: 'Golden Pass Express',
    description: 'Connecting Lucerne and Montreux through the Swiss heartland.',
    category: 'trains',
  },
  {
    title: 'Zurich Airport Bus',
    description: 'Direct express bus link between Zurich city center and the airport.',
    category: 'buses',
  },
  {
    title: 'PostAuto Alpine Route',
    description: 'Spectacular mountain pass bus connections through the Bernese Oberland.',
    category: 'buses',
  },
  {
    title: 'Lake Geneva Ferry',
    description: 'Scenic ferry crossing Lake Geneva between Lausanne and Evian-les-Bains.',
    category: 'boats',
  },
  {
    title: 'Lake Lucerne Steamboat',
    description: 'Historic paddle steamers cruising the picturesque Lake Lucerne.',
    category: 'boats',
  },
];

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
    iconName: value,
    amount: TRAVEL_ENTRIES.filter((e) => e.category === key).length,
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
    if (this.filterForm.all().value()) {
      return TRAVEL_ENTRIES;
    }

    return TRAVEL_ENTRIES.filter((entry) => this.filterForm[entry.category]().value());
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
