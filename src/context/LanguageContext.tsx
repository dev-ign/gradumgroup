import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLanguage(): Language {
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'es') return stored;
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectLanguage);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem('lang', l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
