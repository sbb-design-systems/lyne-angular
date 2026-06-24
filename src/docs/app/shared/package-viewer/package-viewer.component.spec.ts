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
  imageDark: 'assets/test-dark.jpg',
  description: 'Test package',
  label: 'stable',
  labelColor: 'charcoal',
  sections: [
    {
      name: 'Components',
      entries: [
        {
          label: 'Button',
          link: './components/button',
          keywords: ['sbbButton', 'sbb-button-link'],
        },
        {
          label: 'Autocomplete',
          link: './components/autocomplete',
          keywords: ['sbb-autocomplete'],
        },
        {
          label: 'Form Field',
          link: './components/form-field',
          keywords: ['sbbFormField', 'sbb-form-field-clear'],
        },
      ],
    },
    {
      name: 'Guides',
      entries: [
        {
          label: 'Getting started',
          link: './guides/getting-started',
          keywords: [
            'install',
            'setup',
            'npm',
            'yarn',
            'getting started',
            'lyne-elements',
            'schematics',
          ],
        },
        {
          label: 'Theming',
          link: './guides/theming',
          keywords: [
            'theme',
            'dark mode',
            'colors',
            'css variables',
            'design tokens',
            'sass',
            'lean',
          ],
        },
        {
          label: 'Section without keywords',
          link: './guides/theming',
        },
      ],
    },
  ],
};

describe(`sbb-package-viewer`, () => {
  let fixture: ComponentFixture<PackageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageViewerComponent],
      providers: [
        provideRouter([]),
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

    fixture = TestBed.createComponent(PackageViewerComponent);
    fixture.detectChanges();
  });

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

  describe('empty search', () => {
    it('should display all sections and entries when no search term is entered', () => {
      expect(getRenderedSectionNames()).toEqual(['Components', 'Guides']);
      expect(getRenderedLabels()).toEqual([
        'Button',
        'Autocomplete',
        'Form Field',
        'Getting started',
        'Theming',
        'Section without keywords',
      ]);
    });

    it('should display all sections and entries when the search term contains only whitespace', () => {
      typeSearch('   ');
      expect(getRenderedSectionNames()).toEqual(['Components', 'Guides']);
      expect(getRenderedLabels()).toEqual([
        'Button',
        'Autocomplete',
        'Form Field',
        'Getting started',
        'Theming',
        'Section without keywords',
      ]);
    });
  });

  describe('label-based search', () => {
    it('should filter by label (exact match)', () => {
      typeSearch('Button');
      expect(getRenderedLabels()).toEqual(['Button']);
      expect(getRenderedSectionNames()).toEqual(['Components']);
    });

    it('should be case-insensitive', () => {
      typeSearch('button');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should accept uppercase letters', () => {
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

  describe('keyword-based search (components via selector keywords)', () => {
    it('should find an entry via camelCase selector keyword', () => {
      typeSearch('sbbAutocomplete');
      expect(getRenderedLabels()).toEqual(['Autocomplete']);
    });

    it('should find an entry via kebab-case selector keyword', () => {
      typeSearch('sbb-button-link');
      expect(getRenderedLabels()).toEqual(['Button']);
    });

    it('should normalize a kebab-case query against a camelCase keyword (sbb-button → sbbButton)', () => {
      typeSearch('sbb-button');
      expect(getRenderedLabels()).toContain('Button');
    });

    it('should normalize a camelCase query against a kebab-case keyword (sbbFormField → sbb-form-field)', () => {
      typeSearch('sbbFormField');
      expect(getRenderedLabels()).toContain('Form Field');
    });

    it('should find a partial match via keyword', () => {
      // "formfield" → normalized "formfield"; "sbbFormField" → normalized "sbbformfield"
      typeSearch('formfield');
      expect(getRenderedLabels()).toContain('Form Field');
    });

    it('should render no links when no keyword matches', () => {
      typeSearch('sbbNonExistent');
      expect(getRenderedLabels()).toHaveLength(0);
    });

    it('should find a guide entry by an exact keyword', () => {
      typeSearch('npm');
      expect(getRenderedLabels()).toEqual(['Getting started']);
      expect(getRenderedSectionNames()).toEqual(['Guides']);
    });

    it('should be case-insensitive for keyword matching', () => {
      typeSearch('NPM');
      expect(getRenderedLabels()).toContain('Getting started');
    });
  });

  describe('entries without keywords', () => {
    it('should still match by label when an entry has no keywords', () => {
      typeSearch('Section without keywords');
      expect(getRenderedLabels()).toContain('Section without keywords');
    });
  });
});
