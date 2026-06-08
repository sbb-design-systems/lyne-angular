import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import type { ShowcaseMetaPackage } from '../meta';

import { PackageViewerComponent } from './package-viewer.component';
import { SidebarToggle } from './sidebar-toggle';

const MOCK_PACKAGE: ShowcaseMetaPackage = {
  name: '@sbb-esta/lyne-angular',
  iconName: 'test',
  image: 'assets/test.jpg',
  description: 'Test package',
  sections: [
    {
      name: 'Components',
      entries: [
        { label: 'Button', link: './components/button' },
        { label: 'Autocomplete', link: './components/autocomplete' },
        { label: 'Form Field', link: './components/form-field' },
      ],
    },
    {
      name: 'Guides',
      entries: [{ label: 'Getting started', link: './guides/getting-started' }],
    },
  ],
};

const MOCK_SELECTOR_MAP: Record<string, Record<string, string[]>> = {
  angular: {
    button: ['sbbButton', 'sbb-button-link'],
    autocomplete: ['sbb-autocomplete'],
    'form-field': ['sbbFormField', 'sbb-form-field-clear'],
    'getting-started': [],
  },
};

describe(`sbb-package-viewer`, () => {
  let fixture: ComponentFixture<PackageViewerComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageViewerComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { data: of({ packageData: MOCK_PACKAGE }) },
        },
        {
          provide: SidebarToggle,
          useValue: {
            register: vi.fn(),
            unregister: vi.fn(),
            toggle: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PackageViewerComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  /** Flush the HTTP request for the selector-map */
  function flushSelectorMap(
    map: Record<string, Record<string, string[]>> = MOCK_SELECTOR_MAP,
  ): void {
    const req = httpTesting.expectOne('assets/selector-map.json');
    req.flush(map);
    fixture.detectChanges();
  }

  /** Type a value into the search input as a real user would */
  function typeSearch(value: string): void {
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[aria-label="Search results"]',
    );
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  /** Get the text content of all rendered entry links */
  function getRenderedLabels(): string[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('sbb-block-link') as NodeListOf<HTMLElement>,
    ).map((el) => el.textContent?.trim() ?? '');
  }

  /** Get the text content of all rendered section titles */
  function getRenderedSectionNames(): string[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('sbb-title') as NodeListOf<HTMLElement>,
    ).map((el) => el.textContent?.trim() ?? '');
  }

  it('should create the component', () => {
    flushSelectorMap();
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('empty search', () => {
    it('should display all sections and entries when no search term is entered', () => {
      flushSelectorMap();
      expect(getRenderedSectionNames()).toEqual(['Components', 'Guides']);
      expect(getRenderedLabels()).toEqual([
        'Button',
        'Autocomplete',
        'Form Field',
        'Getting started',
      ]);
    });

    it('should display all sections and entries when the search term contains only whitespace', () => {
      flushSelectorMap();
      typeSearch('   ');
      expect(getRenderedSectionNames()).toEqual(['Components', 'Guides']);
      expect(getRenderedLabels()).toEqual([
        'Button',
        'Autocomplete',
        'Form Field',
        'Getting started',
      ]);
    });
  });

  describe('label-based search', () => {
    beforeEach(() => flushSelectorMap());

    it('should filter by label (exact match)', () => {
      typeSearch('Button');
      expect(getRenderedLabels()).toEqual(['Button']);
      expect(getRenderedSectionNames()).toEqual(['Components']);
    });

    it('should be case-insensitive', () => {
      typeSearch('button');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should also accept uppercase letters', () => {
      typeSearch('BUTTON');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should ignore leading and trailing whitespace', () => {
      typeSearch('  button  ');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should find partial matches in the label', () => {
      typeSearch('form');
      expect(getRenderedLabels()).toContain('Form Field');
      expect(getRenderedSectionNames()).toEqual(['Components']);
    });

    it('should match multiple entries simultaneously', () => {
      typeSearch('a');
      // "Autocomplete", "Form Field", "Getting started" all contain "a"
      expect(getRenderedLabels().length).toBeGreaterThan(1);
    });

    it('should filter across sections', () => {
      typeSearch('get');
      expect(getRenderedLabels()).toEqual(['Getting started']);
      expect(getRenderedSectionNames()).toEqual(['Guides']);
    });

    it('should remove sections without matches', () => {
      typeSearch('button');
      expect(getRenderedSectionNames()).not.toContain('Guides');
    });

    it('should render no links when no entry matches', () => {
      typeSearch('xyz-does-not-exist-42');
      expect(getRenderedLabels()).toHaveLength(0);
      expect(getRenderedSectionNames()).toHaveLength(0);
    });
  });

  describe('selector-based search (via selector-map)', () => {
    beforeEach(() => flushSelectorMap());

    it('should find an entry via camelCase selector', () => {
      typeSearch('sbbAutocomplete');
      expect(getRenderedLabels()).toEqual(['Autocomplete']);
    });

    it('should find an entry via kebab-case selector', () => {
      typeSearch('sbb-button-link');
      expect(getRenderedLabels()).toEqual(['Button']);
    });

    it('should normalize a kebab-case query against a camelCase selector (sbb-button → sbbButton)', () => {
      // selectorMap contains "sbbButton", query is "sbb-button"
      typeSearch('sbb-button');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should normalize a camelCase query against a kebab-case selector (sbbFormField → sbb-form-field)', () => {
      typeSearch('sbbFormField');
      expect(getRenderedLabels()).toContain('Form Field');
    });

    it('should find a partial match via selector', () => {
      // Query "formfield" → normalized "formfield", selector "sbbFormField" → normalized "sbbformfield"
      typeSearch('formfield');
      expect(getRenderedLabels()).toContain('Form Field');
    });

    it('should render no links when the selector is not in the map', () => {
      typeSearch('sbbNonExistent');
      expect(getRenderedLabels()).toHaveLength(0);
    });

    it('should derive the correct package key from the package name', () => {
      // "@sbb-esta/lyne-angular" → key "angular"
      // Data is stored under selectorMap["angular"], not "lyne-angular"
      typeSearch('sbbAutocomplete');
      expect(getRenderedLabels()).toHaveLength(1);
    });

    it('should render no links when the selector-map has an empty array for an entry', () => {
      // "getting-started" has an empty selector array → no selector match
      typeSearch('sbbGettingStarted');
      expect(getRenderedLabels()).toHaveLength(0);
    });
  });

  describe('selector-map not yet loaded', () => {
    it('should still display label matches while the map is loading', () => {
      // HTTP request not yet flushed → selector-map not yet loaded
      typeSearch('button');
      expect(getRenderedLabels()).toContain('Button');
      // Request still open: flush now so that afterEach verify() passes
      flushSelectorMap();
    });

    it('should render no results via selector while the map has not been loaded yet', () => {
      // "sbbAutocomplete" does not match any label, map not loaded yet → no match
      typeSearch('sbbAutocomplete');
      expect(getRenderedLabels()).toHaveLength(0);
      flushSelectorMap();
    });
  });

  describe('empty selector-map', () => {
    it('should still display label matches with an empty selector-map', () => {
      flushSelectorMap({});
      typeSearch('button');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should render no selector matches when the package key is missing from the map', () => {
      flushSelectorMap({ other: { button: ['sbbButton'] } });
      typeSearch('sbbButton');
      // No entry for "angular" in the map → no selector match
      expect(getRenderedLabels()).toHaveLength(0);
    });
  });
});
