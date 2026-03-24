import { TestBed } from '@angular/core/testing';

import { LightDarkController } from './light-dark-controller';

describe(`sbb-light-dark-controller`, () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let service: LightDarkController;

  beforeEach(() => {
    mockMatchMedia = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: mockMatchMedia,
    });

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      //no-op
    });
  });

  afterEach(() => {
    document.documentElement.classList.remove('sbb-dark', 'sbb-light');
    vi.clearAllMocks();
  });

  describe('OS prefers light mode (matches: false)', () => {
    beforeEach(() => {
      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      service = TestBed.inject(LightDarkController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should apply sbb-light class when localStorage is empty and OS prefers light mode', async () => {
      await vi.waitUntil(() => document.documentElement.classList.contains('sbb-light'));

      expect(service.isDarkMode()).toBe(false);
      expect(document.documentElement.classList.contains('sbb-light')).toBe(true);
      expect(document.documentElement.classList.contains('sbb-dark')).toBe(false);
    });
  });

  describe('OS prefers dark mode (matches: true)', () => {
    beforeEach(() => {
      mockMatchMedia.mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });
    });

    it('should apply sbb-dark class when localStorage is empty and OS prefers dark mode', async () => {
      service = TestBed.inject(LightDarkController);

      // Wait for initial subscription to apply classes
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(service.isDarkMode()).toBe(true);
      expect(document.documentElement.classList.contains('sbb-dark')).toBe(true);
      expect(document.documentElement.classList.contains('sbb-light')).toBe(false);
    });

    it('should apply stored preference over OS default and toggle correctly', async () => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('false');
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        // no-op
      });

      service = TestBed.inject(LightDarkController);

      // Wait for initial subscription to apply classes
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(service.isDarkMode()).toBe(false);
      expect(document.documentElement.classList.contains('sbb-light')).toBe(true);

      service.toggle();

      // Wait for toggle subscription to apply classes and localStorage changes
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(setItemSpy).toHaveBeenCalledWith('sbbDarkMode', 'true');
      expect(service.isDarkMode()).toBe(true);
      expect(document.documentElement.classList.contains('sbb-dark')).toBe(true);
      expect(document.documentElement.classList.contains('sbb-light')).toBe(false);
    });
  });
});
