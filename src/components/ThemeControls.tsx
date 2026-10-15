import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode, AccentColor, ACCENT_THEMES } from '../context/ThemeContext';
import { Sun, Moon, Clock, Palette, Check } from 'lucide-react';

export const ThemeControls: React.FC = () => {
  const {
    themeMode,
    setThemeMode,
    isDark,
    accentColor,
    setAccentColor,
    currentTheme,
    currentHour,
    isDayTime,
  } = useTheme();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);

  const themeRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setIsColorMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatHour = (h: number) => {
    return `${h.toString().padStart(2, '0')}:00`;
  };

  return (
    <div className="flex items-center gap-2">
      {/* 1. Theme Mode Button (Light / Dark / Auto by Hour) */}
      <div className="relative" ref={themeRef}>
        <button
          onClick={() => {
            setIsThemeMenuOpen(!isThemeMenuOpen);
            setIsColorMenuOpen(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
          }`}
          title="Cambiar ambiente: Claro, Oscuro o Según la hora"
          aria-expanded={isThemeMenuOpen}
        >
          {themeMode === 'auto' ? (
            <Clock className={`w-3.5 h-3.5 ${currentTheme.primaryText}`} />
          ) : isDark ? (
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}

          <span className="hidden sm:inline">
            {themeMode === 'auto'
              ? `Auto (${isDayTime ? 'Día' : 'Noche'})`
              : isDark
              ? 'Oscuro'
              : 'Claro'}
          </span>
        </button>

        {/* Theme Menu Dropdown */}
        {isThemeMenuOpen && (
          <div
            className={`absolute right-0 mt-2 w-64 rounded-xl border p-2 z-50 shadow-xl transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="px-2 py-1.5 mb-1 border-b border-slate-700/50 dark:border-slate-800 text-xs text-slate-400">
              <span className="font-semibold block text-slate-300 dark:text-slate-200">
                Ambiente de Visualización
              </span>
              <span className="text-[11px] block mt-0.5">
                Hora actual del sistema: {formatHour(currentHour)} ({isDayTime ? 'Día' : 'Noche'})
              </span>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  setThemeMode('light');
                  setIsThemeMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  themeMode === 'light'
                    ? isDark
                      ? 'bg-slate-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-900 font-semibold'
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <div className="text-left">
                    <span className="block font-medium">Modo Claro</span>
                    <span className="text-[10px] text-slate-400">Fondo blanco para aulas luminosas</span>
                  </div>
                </div>
                {themeMode === 'light' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              <button
                onClick={() => {
                  setThemeMode('dark');
                  setIsThemeMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  themeMode === 'dark'
                    ? isDark
                      ? 'bg-slate-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-900 font-semibold'
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <div className="text-left">
                    <span className="block font-medium">Modo Oscuro</span>
                    <span className="text-[10px] text-slate-400">Pizarra matemática de alto contraste</span>
                  </div>
                </div>
                {themeMode === 'dark' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              <button
                onClick={() => {
                  setThemeMode('auto');
                  setIsThemeMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  themeMode === 'auto'
                    ? isDark
                      ? 'bg-slate-800 text-white font-medium'
                      : 'bg-slate-100 text-slate-900 font-semibold'
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${currentTheme.primaryText}`} />
                  <div className="text-left">
                    <span className="block font-medium">Según la Hora (Automático)</span>
                    <span className="text-[10px] text-slate-400">
                      06:00 a 18:00 Claro · 18:00 a 06:00 Oscuro
                    </span>
                  </div>
                </div>
                {themeMode === 'auto' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Color Palette Selector Button */}
      <div className="relative" ref={colorRef}>
        <button
          onClick={() => {
            setIsColorMenuOpen(!isColorMenuOpen);
            setIsThemeMenuOpen(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
          }`}
          title="Personalizar color de la interfaz de cálculo"
          aria-expanded={isColorMenuOpen}
        >
          <div
            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
            style={{ backgroundColor: currentTheme.hex }}
          />
          <Palette className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">{currentTheme.name}</span>
        </button>

        {/* Color Menu Dropdown */}
        {isColorMenuOpen && (
          <div
            className={`absolute right-0 mt-2 w-72 rounded-xl border p-2 z-50 shadow-xl transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="px-2 py-1.5 mb-1 border-b border-slate-700/50 dark:border-slate-800 text-xs text-slate-400">
              <span className="font-semibold block text-slate-300 dark:text-slate-200">
                Paleta Académica de Interfaz
              </span>
              <span className="text-[11px] block mt-0.5">
                Seleccione el matiz cromático para botones, gráficas y énfasis
              </span>
            </div>

            <div className="space-y-1">
              {(Object.keys(ACCENT_THEMES) as AccentColor[]).map((colKey) => {
                const item = ACCENT_THEMES[colKey];
                const isSelected = accentColor === colKey;

                return (
                  <button
                    key={colKey}
                    onClick={() => {
                      setAccentColor(colKey);
                      setIsColorMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? isDark
                          ? 'bg-slate-800 text-white font-medium'
                          : 'bg-slate-100 text-slate-900 font-semibold'
                        : isDark
                        ? 'hover:bg-slate-800/60 hover:text-white'
                        : 'hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 ring-1 ring-white/30"
                        style={{ backgroundColor: item.hex }}
                      />
                      <div className="text-left">
                        <span className="block font-medium">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{item.badge}</span>
                      </div>
                    </div>

                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
