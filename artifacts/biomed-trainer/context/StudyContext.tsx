import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n, { AppLanguage, supportedLanguages } from '@/i18n';

export type Language = AppLanguage;

type StudyState = {
  completedLessons: string[];
  language: Language;
  languageSelected: boolean;
  streak: number;
  hasOnboarded: boolean;
};

type StudyContextValue = StudyState & {
  hydrated: boolean;
  completeLesson: (lessonId: string) => void;
  setLanguage: (language: Language) => void;
  finishOnboarding: () => void;
};

const STORAGE_KEY = 'biomed-trainer-study-state';
const initialState: StudyState = {
  completedLessons: [],
  language: 'ru',
  languageSelected: false,
  streak: 7,
  hasOnboarded: false,
};

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<StudyState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored) as Partial<StudyState>;
          const hasUserLanguage = parsed.languageSelected === true && supportedLanguages.includes(parsed.language as AppLanguage);
          const nextLanguage = hasUserLanguage ? parsed.language as AppLanguage : 'ru';
          setState({ ...initialState, ...parsed, language: nextLanguage, languageSelected: hasUserLanguage });
          void i18n.changeLanguage(nextLanguage);
        } else {
          void i18n.changeLanguage('ru');
        }
      })
      .catch(() => {
        void i18n.changeLanguage('ru');
      })
      .finally(() => setHydrated(true));
  }, []);

  const persist = (next: StudyState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
  };

  const value = useMemo<StudyContextValue>(
    () => ({
      ...state,
      hydrated,
      completeLesson: (lessonId) => {
        if (state.completedLessons.includes(lessonId)) return;
        persist({ ...state, completedLessons: [...state.completedLessons, lessonId] });
      },
      setLanguage: (language) => {
        void i18n.changeLanguage(language);
        persist({ ...state, language, languageSelected: true });
      },
      finishOnboarding: () => persist({ ...state, hasOnboarded: true }),
    }),
    [hydrated, state],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy must be used inside StudyProvider');
  return context;
}