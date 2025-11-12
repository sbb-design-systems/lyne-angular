export interface ShowcaseMetaPackage {
  name: string;
  svgIcon: string;
  image: string;
  description: string;
  sections: ShowcaseMetaSection[];
  isDeprecated?: boolean;
}

export interface ShowcaseMetaSection {
  name: string;
  entries: ShowcaseMetaEntry[];
}

export interface ShowcaseMetaEntry {
  label: string;
  link: string;
  variantOnly?: 'standard' | 'lean';
}

export const PACKAGES: Record<string, ShowcaseMetaPackage> = {
  angular: {
    name: '@sbb-esta/angular',
    svgIcon: 'browser-small',
    image: 'assets/websites.jpg',
    description: 'Components which can be used for websites and webapps.',
    sections: [
      {
        name: 'Introduction',
        entries: [
          { label: 'Getting started', link: './introduction/getting-started' },
          { label: 'Typography', link: './introduction/typography' },
        ],
      },
      {
        name: 'Guides',
        entries: [{ label: 'TBD', link: './tbd' }],
      },
      {
        name: 'Components',
        entries: [
          { label: 'Accordion', link: './components/accordion' },
          { label: 'Alert', link: './components/alert' },
          { label: 'Button - Mini button', link: './components/button/mini-button' },
          { label: 'TBD', link: './tbd' },
        ],
      },
    ],
  },
  'angular-experimental': {
    name: '@sbb-esta/angular-experimental',
    svgIcon: 'cloud-lightning-small',
    image: 'assets/websites.jpg',
    description: 'Experimental components which can be used for websites and webapps.',
    sections: [
      {
        name: 'Introduction',
        entries: [{ label: 'Getting started', link: './introduction/getting-started' }],
      },
      {
        name: 'Modules',
        entries: [{ label: 'TBD', link: './tbd' }],
      },
    ],
  },
};

export function findPackageEntry(packageName: string, componentId: string): ShowcaseMetaEntry {
  for (const section of PACKAGES[packageName].sections) {
    const foundEntry = section.entries.find((entry) => entry.link.endsWith(componentId));
    if (foundEntry) {
      return foundEntry;
    }
  }

  return null!;
}
