import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'ru' | 'kk' | 'en';

type StudyState = {
  completedLessons: string[];
  language: Language;
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
  language: 'en',
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
          setState({ ...initialState, ...JSON.parse(stored) } as StudyState);
        }
      })
      .catch(() => undefined)
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
      setLanguage: (language) => persist({ ...state, language }),
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