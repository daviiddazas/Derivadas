/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideViewer } from './components/SlideViewer';
import { PresentationDrawer } from './components/PresentationDrawer';
import { ThemeControls } from './components/ThemeControls';
import { AnnotationCanvas } from './components/AnnotationCanvas';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { generateSlideMarkdown } from './utils/markdownExporter';
import { Menu, BookOpen } from 'lucide-react';

function AppContent() {
  const { isDark, currentTheme } = useTheme();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const totalSlides = SLIDES_DATA.length;
  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // Navigation handlers
  const handleNavigate = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlideIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [totalSlides]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDrawerOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNavigate(currentSlideIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handleNavigate(currentSlideIndex - 1);
      } else if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, handleNavigate, isDrawerOpen, isFullScreen]);

  // Fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullScreen(false);
    }
  };

  // Copy single slide markdown
  const handleCopyMarkdown = async () => {
    const md = generateSlideMarkdown(currentSlide);
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Universal Top Bar following 3-zone contract */}
      <header
        className={`flex items-center justify-between gap-6 px-4 sm:px-6 py-3 border-b backdrop-blur sticky top-0 z-40 transition-colors ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white/90 border-slate-200 shadow-xs'
        }`}
      >
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavigate(0)}
          className={`text-base font-bold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 transition-colors ${
            isDark ? 'text-white hover:text-indigo-300' : 'text-slate-900 hover:text-indigo-600'
          }`}
        >
          <BookOpen className="w-5 h-5" style={{ color: currentTheme.hex }} />
          <span>Cálculo Diferencial: La Derivada</span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-500 dark:text-slate-300">
          <button
            onClick={() => handleNavigate(1)}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentSlideIndex === 1 ? `${currentTheme.accentText} font-semibold` : ''
            }`}
          >
            Recta Tangente
          </button>
          <button
            onClick={() => handleNavigate(2)}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentSlideIndex === 2 ? `${currentTheme.accentText} font-semibold` : ''
            }`}
          >
            Tasas de Cambio
          </button>
          <button
            onClick={() => handleNavigate(4)}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentSlideIndex === 4 ? `${currentTheme.accentText} font-semibold` : ''
            }`}
          >
            Derivabilidad
          </button>
          <button
            onClick={() => handleNavigate(6)}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentSlideIndex === 6 ? `${currentTheme.accentText} font-semibold` : ''
            }`}
          >
            Reglas de Cálculo
          </button>
          <button
            onClick={() => handleNavigate(8)}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentSlideIndex === 8 ? `${currentTheme.accentText} font-semibold` : ''
            }`}
          >
            Evaluación
          </button>
        </nav>

        {/* Zone 3: Environment Toggle (Light/Dark/Auto), Color Palette Picker, & Slide Index Button */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeControls />

          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs ${currentTheme.primaryBg} ${currentTheme.primaryHover}`}
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Índice</span>
          </button>
        </div>
      </header>

      {/* Main Slide Viewer Canvas */}
      <SlideViewer
        slide={currentSlide}
        totalSlides={totalSlides}
        currentSlideIndex={currentSlideIndex}
        onNavigate={handleNavigate}
        isFullScreen={isFullScreen}
        onToggleFullScreen={toggleFullScreen}
        onCopyMarkdown={handleCopyMarkdown}
        copied={copied}
      />

      {/* Professorial Interactive Annotation Overlay (Laser, Pen, Highlighter, Spotlight, Box) */}
      <AnnotationCanvas />

      {/* Slide Navigation Drawer & Export Modal */}
      <PresentationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentIndex={currentSlideIndex}
        onSelectSlide={handleNavigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
