import { useLanguage } from '../context/LanguageContext';
import { getByPath, translations } from './translations';

/**
 * Returns the translation for a dot-path key (e.g. "home.hero.tagline" or "home.divisions.0.name").
 * Falls back to the key if the path is missing.
 */
export function useTranslation() {
  const { lang } = useLanguage();
  const dict = translations[lang] as Record<string, unknown>;

  function t(key: string): string {
    const value = getByPath(dict, key);
    return typeof value === 'string' ? value : key;
  }

  /**
   * Returns an array of strings for a path that points to a string[] (e.g. "about.overview").
   * Returns empty array if the path is not an array of strings.
   */
  function tArray(key: string): string[] {
    const value = getByPath(dict, key);
    if (!Array.isArray(value)) return [];
    return value.every((v): v is string => typeof v === 'string') ? value : [];
  }

  /**
   * Returns the raw value at the path (for objects or arrays of objects).
   * Use when you need a structured value instead of a single string.
   */
  function tRaw<T = unknown>(key: string): T | undefined {
    return getByPath(dict, key) as T | undefined;
  }

  return { t, tArray, tRaw };
}
