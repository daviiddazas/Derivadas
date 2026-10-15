import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type AccentColor = 'indigo' | 'emerald' | 'sky' | 'violet' | 'amber' | 'rose';

export interface RawAccentThemeConfig {
  id: AccentColor;
  name: string;
  badge: string;
  primaryBg: string;
  primaryHover: string;
  primaryTextLight: string;
  primaryTextDark: string;
  accentTextLight: string;
  accentTextDark: string;
  borderLightLight: string;
  borderLightDark: string;
  subtleBgLight: string;
  subtleBgDark: string;
  ringColor: string;
  graphStroke: string;
  hex: string;
}

export interface AccentThemeConfig {
  id: AccentColor;
  name: string;
  badge: string;
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  accentText: string;
  borderLight: string;
  subtleBg: string;
  ringColor: string;
  graphStroke: string;
  hex: string;
}

export const RAW_ACCENT_THEMES: Record<AccentColor, RawAccentThemeConfig> = {
  indigo: {
    id: 'indigo',
    name: 'Índigo Cátedra',
    badge: 'Gauss & Euler',
    primaryBg: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-500',
    primaryTextLight: 'text-indigo-700',
    primaryTextDark: 'text-indigo-400',
    accentTextLight: 'text-indigo-800',
    accentTextDark: 'text-indigo-300',
    borderLightLight: 'border-indigo-200',
    borderLightDark: 'border-indigo-800',
    subtleBgLight: 'bg-indigo-50',
    subtleBgDark: 'bg-indigo-950/70',
    ringColor: 'ring-indigo-500',
    graphStroke: '#4f46e5',
    hex: '#4f46e5',
  },
  emerald: {
    id: 'emerald',
    name: 'Esmeralda Matemático',
    badge: 'Newton & Física',
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-500',
    primaryTextLight: 'text-emerald-700',
    primaryTextDark: 'text-emerald-400',
    accentTextLight: 'text-emerald-800',
    accentTextDark: 'text-emerald-300',
    borderLightLight: 'border-emerald-200',
    borderLightDark: 'border-emerald-800',
    subtleBgLight: 'bg-emerald-50',
    subtleBgDark: 'bg-emerald-950/70',
    ringColor: 'ring-emerald-500',
    graphStroke: '#059669',
    hex: '#059669',
  },
  sky: {
    id: 'sky',
    name: 'Azul Zafiro Leibniz',
    badge: 'Infinitesimal',
    primaryBg: 'bg-sky-600',
    primaryHover: 'hover:bg-sky-500',
    primaryTextLight: 'text-sky-700',
    primaryTextDark: 'text-sky-400',
    accentTextLight: 'text-sky-800',
    accentTextDark: 'text-sky-300',
    borderLightLight: 'border-sky-200',
    borderLightDark: 'border-sky-800',
    subtleBgLight: 'bg-sky-50',
    subtleBgDark: 'bg-sky-950/70',
    ringColor: 'ring-sky-500',
    graphStroke: '#0284c7',
    hex: '#0284c7',
  },
  violet: {
    id: 'violet',
    name: 'Amatista Fermat',
    badge: 'Máximos & Mínimos',
    primaryBg: 'bg-violet-600',
    primaryHover: 'hover:bg-violet-500',
    primaryTextLight: 'text-violet-700',
    primaryTextDark: 'text-violet-400',
    accentTextLight: 'text-violet-800',
    accentTextDark: 'text-violet-300',
    borderLightLight: 'border-violet-200',
    borderLightDark: 'border-violet-800',
    subtleBgLight: 'bg-violet-50',
    subtleBgDark: 'bg-violet-950/70',
    ringColor: 'ring-violet-500',
    graphStroke: '#7c3aed',
    hex: '#7c3aed',
  },
  amber: {
    id: 'amber',
    name: 'Ámbar Áureo',
    badge: 'Razón & Proporción',
    primaryBg: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-500',
    primaryTextLight: 'text-amber-800',
    primaryTextDark: 'text-amber-400',
    accentTextLight: 'text-amber-900',
    accentTextDark: 'text-amber-300',
    borderLightLight: 'border-amber-200',
    borderLightDark: 'border-amber-800',
    subtleBgLight: 'bg-amber-50',
    subtleBgDark: 'bg-amber-950/70',
    ringColor: 'ring-amber-500',
    graphStroke: '#d97706',
    hex: '#d97706',
  },
  rose: {
    id: 'rose',
    name: 'Carmesí Cauchy',
    badge: 'Límites & Rigor',
    primaryBg: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-500',
    primaryTextLight: 'text-rose-700',
    primaryTextDark: 'text-rose-400',
    accentTextLight: 'text-rose-800',
    accentTextDark: 'text-rose-300',
    borderLightLight: 'border-rose-200',
    borderLightDark: 'border-rose-800',
    subtleBgLight: 'bg-rose-50',
    subtleBgDark: 'bg-rose-950/70',
    ringColor: 'ring-rose-500',
    graphStroke: '#e11d48',
    hex: '#e11d48',
  },
};

export const ACCENT_THEMES = RAW_ACCENT_THEMES;

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  currentTheme: AccentThemeConfig;
  currentHour: number;
  isDayTime: boolean;
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('catedra_theme_mode');
    return (saved as ThemeMode) || 'auto';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('catedra_accent_color');
    return (saved as AccentColor) || 'indigo';
  });

  const [currentHour, setCurrentHour] = useState<number>(() => new Date().getHours());

  // Periodically check hour to update auto mode seamlessly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  // Day time is between 06:00 and 18:00 (6 AM to 6 PM)
  const isDayTime = currentHour >= 6 && currentHour < 18;

  // Resolved dark state
  const isDark = themeMode === 'auto' ? !isDayTime : themeMode === 'dark';

  useEffect(() => {
    localStorage.setItem('catedra_theme_mode', themeMode);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [themeMode, isDark]);

  useEffect(() => {
    localStorage.setItem('catedra_accent_color', accentColor);
  }, [accentColor]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  const toggleThemeMode = () => {
    if (themeMode === 'auto') setThemeMode('light');
    else if (themeMode === 'light') setThemeMode('dark');
    else setThemeMode('auto');
  };

  const currentTheme = useMemo<AccentThemeConfig>(() => {
    const raw = RAW_ACCENT_THEMES[accentColor] || RAW_ACCENT_THEMES.indigo;
    return {
      id: raw.id,
      name: raw.name,
      badge: raw.badge,
      primaryBg: raw.primaryBg,
      primaryHover: raw.primaryHover,
      primaryText: isDark ? raw.primaryTextDark : raw.primaryTextLight,
      accentText: isDark ? raw.accentTextDark : raw.accentTextLight,
      borderLight: isDark ? raw.borderLightDark : raw.borderLightLight,
      subtleBg: isDark ? raw.subtleBgDark : raw.subtleBgLight,
      ringColor: raw.ringColor,
      graphStroke: raw.graphStroke,
      hex: raw.hex,
    };
  }, [accentColor, isDark]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        isDark,
        accentColor,
        setAccentColor,
        currentTheme,
        currentHour,
        isDayTime,
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
